/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { Authenticate } = require("../../models/index/index");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: No token provided" } },
    });
  }

  try {
    const tokenDetails = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userDetails = await Authenticate.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(tokenDetails._id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "userId",
          as: "user",
        },
      },
    ]);
    req.user = {
      ...tokenDetails,
      firstName: userDetails[0].user[0].firstName,
      lastName: userDetails[0].user[0].lastName,
      email: userDetails[0].email,
      phone: userDetails[0].phone,
      location: userDetails[0].location,
    };
    next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(403).json({
      errors: { common: { msg: "Access Denied: Invalid token" } },
    });
  }
};
