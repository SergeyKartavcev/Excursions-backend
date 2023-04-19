const { Schema, model } = require("mongoose");

const qvestShema = Schema({
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

const Qvest = model("qvest", qvestShema);
module.exports = Qvest;
