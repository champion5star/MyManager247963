const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createEvent,
  getEvents,
  deleteEvent,
  getEventInfo,
  addNewGuests,
} = require("../controllers/event");
// Create event
router.post("/create/", isAuthenticated, createEvent);
router.get("/all/:userId", isAuthenticated, getEvents);

//Add new Guests
router.post("/add-guests", isAuthenticated, addNewGuests);
router.delete("/:eventId", isAuthenticated, deleteEvent);
router.get("/info/:eventId", isAuthenticated, getEventInfo);

module.exports = router;
