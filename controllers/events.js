const Event = require("../models/event");

const getEvents = async (req, res) => {
  const events = await Event.find({});
  res.json(events);
};


async function getEvent(req, res, next) {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);

  if (!event) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(event);
}




const addEvents = async (req, res) => {
  const { eventId } = req.params;
  const { title, date, description, time, price } = req.body;
  const img = req.file ? req.file.path : null;

  const result = await Event.create({
    eventId,
    title,
    img,
    description,
    date,
    time,
    price,
  });
  res.status(201).json(result); // возвращаем созданный объект экскурсии
};

const deleteEvents = async (req, res) => {
  const { eventId } = req.params;
  const result = await Event.findById(eventId);
  if (result.status) {
    return next(HttpError(404, "Not found"));
  } await Event.findByIdAndRemove(eventId);
  return res.status(200).json({ message: "подія видалена" });
};


module.exports = {
  getEvents,
  addEvents,
  deleteEvents,
  getEvent
};
