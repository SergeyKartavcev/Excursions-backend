const { Schema, model } = require("mongoose");

const videoShema = Schema({
  title: {
    type: String,
  },
  link: { 
  type: String,
  },
});

const Video = model("video", videoShema);
module.exports = Video;
