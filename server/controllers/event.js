const Event = require("../models/Event");

/**
 *
 * @desc Create Event Controller
 * @route POST /api/event/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event({ ...req.body });
    newEvent.save((err, result) => {
      res.status(201).json({
        msg: "Event successfully created",
        data: result,
      });
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Get all events of user
 * @route GET api/event/all/:userId
 * @returns
 */
exports.getEvents = async (req, res) => {
  const { userId } = req.params;
  try {
    const events = await Event.find({ userId });
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Get information of a event
 * @route GET api/event/info/:eventId
 * @return
 */
exports.getEventInfo = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ msg: "Not Found" });
    }
    return res.status(200).json(event);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

/**
 * @desc Delete a Event by event Id
 * @route GET api/event/info/:eventId
 * @return
 */
exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    await Event.findByIdAndDelete(eventId);
    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
};

//Add new Guests
exports.addNewGuests = async (req, res) => {
  const { _id, data } = req.body;
  try {
    const event = await Event.findById(_id);
    const remainingGuests = event.ticketAvailabeQuantity - data.length - event.guests.length;
    if (remainingGuests < 0) {
      res.status(404).json({ msg: "Not enough tickets" });
    } else {
      await data.map((guest) => {
        event.guests.unshift(guest);
      });
      event.save().then(res.status(200).json({ data: event, msg: "Successfully added" }));
    }
  } catch (err) {
    return res.status(404).json({
      errors: { common: { msg: err.message } },
    });
  }
};
