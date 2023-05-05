const { Schema, model } = require("mongoose");

const weShema = Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  gid: {
    type: String,
  },
  img: {
    type: Object,
  },
});

const We = model("we", weShema);
module.exports = We;
