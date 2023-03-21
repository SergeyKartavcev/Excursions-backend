const { Schema, model } = require("mongoose");

const videoShema = Schema({
  title: {
    type: String,
  },
  video: { 
  type: String,
  },
  description:{
    type: String
  },
});

const Video = model("video", videoShema);
module.exports = Video;
