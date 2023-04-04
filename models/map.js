const { Schema, model } = require("mongoose");

const mapShema = Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  zoom: {
    type: Number,
    required: true,
  },
});

const MapModel  = model("map", mapShema);
module.exports = MapModel ;
