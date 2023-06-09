const { Schema, model } = require("mongoose");

const excursionShema = Schema({
  title: {
    type: String,
  },
  img: {
    type: Object,
  },
  route: {
    type: String,
  },
  description: {
    type: String,
  },
  stops: {
    type: String,
  },
  long: {
    type: String,
  },
  time: {
    type: String,
  },
  price: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now }
});

const Excursion = model("excursion", excursionShema);
module.exports = Excursion;
