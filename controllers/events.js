const Event = require("../models/event");

const getEvents = async (req, res) => {
  const events = await Event.find({});
  res.json(events);
};

const getEvent = async (req, res) => {
  const eventId = req.params.id;
  Event.findById(eventId)
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const addEvents = async (req, res) => {
  const { title, date, description, time, price } = req.body;
  const img = req.file ? req.file.path : null;

  const result = await Event.create({
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
  const result = await Event.deleteOne(eventId);
  if (result.status) {
    res.status(result.status).json({ message: result.message });
  } else {
    res.status(200).json(result);
  }
};


module.exports = {
  getEvents,
  addEvents,
  deleteEvents,
  getEvent
};
