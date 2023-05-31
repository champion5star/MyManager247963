/* eslint-disable consistent-return */
const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// eslint-disable-next-line object-curly-newline
const { Authenticate, Temp, User, EmployeeContact, ResetPass } = require("../models/index/index");
const generateTokens = require("../Utilities/generateToken");
const { generateOTP, sendEmailVerification, phoneOtpSend } = require("../Utilities/generateOTP");

// Hash Password
const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// @desc Create a New Account/User
// @route POST /{prefix}/auth/signup
// @access Public
exports.signup = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { firstName, lastName, phoneOrEmail, password, otp } = req.body;
  let phone = "";
  let email = "";

  if (phoneOrEmail.indexOf("@") === -1) {
    phone = phoneOrEmail;
  } else {
    email = phoneOrEmail;
  }
  const hashedPassword = (await hashPass(password)).toString();

  Temp.findOne({ phoneOrEmail, otp }, (err, user) => {
    if (err) {
      return res.status(500).json({ errors: { common: { msg: err.message } } });
    }
    if (!user) {
      return res.status(401).json({ errors: { common: { msg: "Invalid OTP" } } });
    }
    // eslint-disable-next-line no-shadow
    Authenticate.findOne({ email, phone }).exec((err, user) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }

      if (user) {
        return res.status(409).json({
          errors: {
            common: { msg: "Email or Phone Number Already Taken" },
          },
        });
      }
      const newAuth = new Authenticate({
        email,
        phone,
        hashed_password: hashedPassword,
      });

      const newUser = new User({
        userId: newAuth._id,
        firstName,
        lastName,
      });

      // eslint-disable-next-line no-shadow
      newUser.save((err) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        }
      });

      // eslint-disable-next-line no-shadow
      newAuth.save((err, success) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        }

        if (success) {
          // eslint-disable-next-line no-shadow
          Temp.findOneAndDelete({ phoneOrEmail, otp }, (err, success) => {
            if (err) {
              // eslint-disable-next-line no-unused-vars, no-shadow
              Authenticate.findOneAndDelete({ email, phone }, (err, success) => {
                if (err) {
                  return res.status(500).json({
                    errors: { common: { msg: err.message } },
                  });
                }
              });
            } else if (success) {
              const asynGenerateToken = async () => {
                const { accessToken, refreshToken } = await generateTokens({
                  _id: newAuth._id,
                });

                return res.json({
                  userData: {
                    id: newAuth._id,
                    fullName: `${firstName} ${lastName}`,
                    username: "",
                    avatar: "",
                    email,
                    role: "",
                    ability: [
                      {
                        action: "",
                        subject: "",
                      },
                    ],
                    extras: {
                      eCommerceCartItemsCount: "",
                    },
                  },
                  accessToken,
                  refreshToken,
                });
              };

              asynGenerateToken();
            }
          });
        }
      });
    });
  });
};

exports.login = async (req, res) => {
  const { phoneOrEmail, password } = req.body;

  let phone = "";
  let email = "";
  let method;
  if (phoneOrEmail.indexOf("@") === -1) {
    phone = phoneOrEmail;
    method = "phone";
  } else {
    email = phoneOrEmail;
    method = "email";
  }

  var user;
  if (method === "email") {
    user = await Authenticate.findOne({ email: phoneOrEmail });
  }

  if (method === "phone") {
    user = await Authenticate.findOne({ phone: phoneOrEmail });
  }

  if (user && (await bcrypt.compare(password, user.hashed_password))) {
    try {
      // Check if user is Active
      const userData = await User.findOne({ userId: user._id });
      const isActive = userData?.isActive;

      if (!isActive) {
        return res.status(401).json({
          msg: "Your account has been compromised. Please contact support.",
        });
      }

      const asynGenerateToken = async () => {
        var userId = user._id;
        var employee = null;
        // Handle Employee Login
        if (user.accType === "user-employee") {
          // const emp = await
          if (method === "phone") {
            const emp = await EmployeeContact.findOne({ phone: phoneOrEmail });
            if (!emp) {
              throw Error("User not Found !");
            } else {
              userId = emp.userId;
              employee = emp;
            }
          }

          // if employee logged with email
          if (method === "email") {
            const emp = await EmployeeContact.findOne({ email: phoneOrEmail });
            if (!emp) {
              throw Error("User not Found !");
            } else {
              userId = emp.userId;
              employee = emp;
            }
          }
        }

        const userInfo = {
          type: user.accType === "user-employee" ? "user-employee" : "admin",
          employeeId: user.accType === "user-employee" ? employee._id : null,
        };

        const { accessToken, refreshToken } = await generateTokens({
          _id: userId,
          user: userInfo,
        });

        // Build Payload
        var userType = "user";
        let fullName = "";
        if (user.accType === "user-employee") {
          fullName = employee.fullName;
          userType = "employee";
        } else {
          // Temprary count as User
          const data = await User.findOne({ email, phone });

          fullName = `${data.firstName} ${data.lastName}`;
        }

        const userData = await User.findOne({ userId: user._id });

        return res.json({
          userData: {
            id: user._id,
            fullName: `${userData.firstName} ${userData.lastName}`,
            username: "",
            avatar: "",
            email,
            userType,
            role: "admin",
            ability: [
              {
                action: "manage",
                subject: "all",
              },
            ],
            extras: {
              eCommerceCartItemsCount: "",
            },
          },
          accessToken,
          refreshToken,
        });
      };

      asynGenerateToken();
    } catch (err) {
      return res.status(401).json({ msg: err });
    }
  } else {
    return res.status(401).json({ msg: "Invalid Credential" });
  }
};

exports.sendResetPassOTP = asyncHandler(async (req, res) => {
  const { phoneOrEmail, countryCode } = req.body;

  if (!phoneOrEmail) {
    return res.status(400).json({
      failed: "Please provide Phone Or Email",
    });
  }
  let phone = "";
  let email = "";
  let method = "phone";

  if (phoneOrEmail.indexOf("@") === -1) {
    phone = phoneOrEmail;
    method = "phone";
  } else {
    email = phoneOrEmail;
    method = "email";
  }

  /* eslint-disable no-console */
  console.log("====================================");
  console.log("Identifyer is ", method);
  console.log("====================================");
  /* eslint-enable */

  Authenticate.findOne({ email, phone }).exec(async (err, user) => {
    if (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }
    if (!user) {
      return res.status(500).json({
        errors: { common: { msg: "Phone or Email is not valid" } },
      });
    }
    // Generate Otp
    const otp = generateOTP();

    // Save email and otp
    await ResetPass.create({
      phoneOrEmail,
      otp,
    });

    // Send otp
    if (method === "phone") {
      phoneOtpSend({ phone, otp, countryCode });
    } else {
      await sendEmailVerification(email, otp);
    }
    return res.status(201).json({
      success: "OTP Sending Successfull",
    });
  });
});

exports.resetPass = asyncHandler(async (req, res) => {
  const { otp, password } = req.body;

  const hashedPassword = (await hashPass(password)).toString();

  const user = await ResetPass.findOne({ otp });

  let phone = "";
  let email = "";
  let method = "phone";

  if (user) {
    if (user.phoneOrEmail.indexOf("@") === -1) {
      phone = user.phoneOrEmail;
      method = "phone";
    } else {
      email = user.phoneOrEmail;
      method = "email";
    }
    if (otp && password) {
      if (user.phoneOrEmail && parseInt(otp, 10) === parseInt(user.otp, 10)) {
        // =================
        Authenticate.findOneAndUpdate(
          { email, phone },
          { hashed_password: hashedPassword },
          { new: true },
          (err, success) => {
            if (err) {
              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            }
            return res.status(200).json({
              success: "Password Reset Successfull",
            });
          }
        );
        // ==================
      } else {
        return res.status(401).json({
          failed: "OTP is invalid",
        });
      }
    } else {
      return res.status(400).json({
        failed: "Please provide all fields",
      });
    }
  } else {
    return res.status(400).json({
      failed: "User Not Found",
    });
  }
});

exports.validateToken = async (req, res) => {
  try {
    const { token } = req.body;
    // Lets Verify Token
    //   token;
    const tokenDetails = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (tokenDetails._id !== "") {
      return res.send("valid");
    }
    return res.send("invalid");
  } catch (error) {
    return res.send("invalid");
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET_KEY,
  algorithms: ["HS256"],
});

async function findUserData({ method, phoneOrEmail, user }) {
  //   console.log(method, phoneOrEmail, user);

  let secondQuery = {};
  if (user.accType === "user") {
    secondQuery = {
      ...secondQuery,
    };
  }

  if (user.accType === "user-employee") {
    // build second Info
    if (method === "email") {
      secondQuery = {
        ...secondQuery,
        email: phoneOrEmail,
      };
    } else {
      // Method phone
      secondQuery = {
        ...secondQuery,
        phone: phoneOrEmail,
      };
    }
  }

  let userResultForOutput;
  if (method === "email") {
    const userData = await Authenticate.aggregate([
      { $match: { $or: [{ email: phoneOrEmail }] } },

      // Lookup user
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "userId",
          as: "user",
        },
      },

      // Lookup user Employee
      {
        $lookup: {
          from: "u-employees",
          localField: "_id",
          foreignField: "userId",
          as: "employee",
          // if employee Login then Match Employee
          pipeline: [{ $match: secondQuery }],
        },
      },
    ]);

    // eslint-disable-next-line prefer-destructuring
    userResultForOutput = userData[0];
  }

  if (method === "phone") {
    const userData = await Authenticate.aggregate([
      { $match: { $or: [{ phone: phoneOrEmail }] } },

      // Lookup user
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "userId",
          as: "user",
        },
      },

      // Lookup user Employee
      {
        $lookup: {
          from: "u-employees",
          localField: "_id",
          foreignField: "userId",
          as: "employee",
          // if employee Login then Match Employee
          pipeline: [{ $match: secondQuery }],
        },
      },
    ]);

    // eslint-disable-next-line prefer-destructuring
    userResultForOutput = userData[0];
  }

  return user;
}
