const { Membership, Shop } = require("../models/index/index");
const { default: mongoose } = require("mongoose");

exports.create = async (req, res) => {
  try {
    let membershipDetails = req.body;
    let userId = req.params.userId;
    membershipDetails.userId = userId;
    let membershipObj = new Membership(membershipDetails);
    await membershipObj.save(async (err, data) => {
      if (err) {
        res.send({ msg: err.message, success: false });
      } else if (data) {
        let result = await Shop.updateOne(
          { userId: mongoose.Types.ObjectId(userId), shopCategory: "membership" },
          { $push: { memberships: data._id } }
        );
        if (result.modifiedCount > 0) {
          res.send({
            msg: "membership created successfully",
            success: true,
          });
        } else {
          res.send({ msg: "membership not created", success: false });
        }
      }
    });
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.membershipInfo = (req, res) => {
  try {
    let membershipId = req.params.membershipId;
    Membership.find({ _id: mongoose.Types.ObjectId(membershipId), isDeleted: false }).exec(
      (err, data) => {
        if (err) {
          res.send({ msg: "membership  not found", success: false });
        } else {
          res.send({ data, success: true });
        }
      }
    );
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.membershipUpdate = async (req, res) => {
  try {
    let membershipData = req.body;
    const membershipId = req.params.membershipId;
    Membership.updateOne({ _id: membershipId }, { $set: membershipData }).exec(
      async (err, data) => {
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        } else {
          if (data.modifiedCount > 0) {
            return res.send({
              msg: "membership updated succesfully",
              success: false,
            });
          }
        }
      }
    );
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.remove = async (req, res) => {
  try {
    let id = req.params.Id;
    let delete_membership = await Membership.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { isDeleted: true } }
    );
    if (delete_membership.modifiedCount > 0) {
      return res.send({ msg: "membership deleted successfully", success: true });
    } else {
      return res.send({ msg: "membership not deleted", success: false });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
