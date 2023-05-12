const routers = require("express").Router();

const {
  getVideos,
  addVideo,
  deleteVideos,
} = require("../controllers/videos");


routers.get("/", getVideos);
routers.post("/", addVideo);
routers.delete("/:id", deleteVideos);

module.exports = routers;
