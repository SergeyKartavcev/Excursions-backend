const { Schema, model } = require("mongoose");

const qvestShema = Schema({
  title: {
    type: String,
  },
  img: {
    type: Object,
  },
  whose: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  bring: {
    type: String,
  },
  price: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now }
});

const Qvest = model("qvest", qvestShema);
module.exports = Qvest;
