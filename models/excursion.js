const { Schema, model } = require("mongoose");

const excursionShema = Schema({
  title: {
    type: String,
  },
  img: {
    type: Object,
  },
  price: {
    type: String,
  },
  description:{
    type: String
  },
});

const Excursion = model("excursion", excursionShema);
module.exports = Excursion;
