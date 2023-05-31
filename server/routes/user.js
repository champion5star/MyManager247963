const router = require("express").Router();

const { addOrUpdateLocation } = require("../controllers/user");
const isAuthenticated = require("../middleware/auth");

router.put("/location", isAuthenticated, addOrUpdateLocation);

module.exports = router;
