const mongoose = require("mongoose");
const { Shop } = require("../models/index/index");

exports.createShop = async (req, res) => {
  const bodyData = req.body;
  const { userId } = req.params;
  bodyData.userId = userId;
  const newShop = new Shop(bodyData);
  // eslint-disable-next-line no-unused-vars
  newShop.save((err, success) => {
    if (err) {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      }
    }
    return res.status(201).json({
      success: "Shop created successfull",
    });
  });
};

exports.shopByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const ShopData = await Shop.find({
      isDeleted: false,
      userId: mongoose.Types.ObjectId(userId),
    });
    return res.status(200).send(ShopData);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const id = req.params.Id;
    const ShopData = await Shop.find({
      _id: id,
      isDeleted: false,
    });
    return res.status(200).send(ShopData);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.Id;
    const Update = await Shop.updateOne({ _id: id }, { $set: req.body });
    if (Update.modifiedCount > 1) {
      return res.send({ msg: "Shop updated successfully", success: true });
    }
    return res.send({ msg: "not updated", success: false });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.Id;
    const deleteShop = await Shop.updateOne({ _id: id }, { isDeleted: true });
    if (deleteShop.modifiedCount > 1) {
      return res.send({ msg: "Shop deleted successfully", success: true });
    }
    return res.send({ msg: "not deleted", success: false });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
