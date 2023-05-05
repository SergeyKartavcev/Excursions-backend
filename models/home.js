const { Schema, model } = require("mongoose");

const homeShema = Schema({
  img: {
    type: Object,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Home = model("home", homeShema);
module.exports = Home;
