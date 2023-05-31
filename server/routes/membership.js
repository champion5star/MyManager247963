const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const membershipController = require("../controllers/membership");

// membership routes
router.post(
  "/membership/add_membership/:userId",
  results,
  isAuthenticated,
  membershipController.create
);
router.get(
  "/membership/info_membership/:membershipId",
  results,
  isAuthenticated,
  membershipController.membershipInfo
);
router.put(
  "/membership/update_by_Id/:membershipId",
  results,
  isAuthenticated,
  membershipController.membershipUpdate
);
router.delete(
  "/membership/delete_membership/:Id",
  isAuthenticated,
  results,
  membershipController.remove
);
module.exports = router;
