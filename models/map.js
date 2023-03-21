const { Schema, model } = require("mongoose");

const mapShema = Schema({
  title: String,
  map: String,
});

const MapModel  = model("map", mapShema);
module.exports = MapModel ;
