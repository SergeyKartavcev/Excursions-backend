const { Schema, model } = require("mongoose");

const eventShema = Schema({
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  img: {
    type: Object,
  },
  description: {
    type: String,
  },
  time: {
    type: String,
  },
  price: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Event = model("event", eventShema);
module.exports = Event;
