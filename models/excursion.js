const { Schema, model } = require("mongoose");

const exrsionShema = Schema({
  title: {
    type: String,
  },
  img: { 
  type: String,
  default: "",
  },
  price: {
    type: String,
  },
  description:{
    type: String
  },
});

const Excursion = model("excursion", exrsionShema);
module.exports = Excursion;
