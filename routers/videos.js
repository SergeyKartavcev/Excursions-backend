const routers = require("express").Router();
const {
  getVideos,
  addVideo,
  deleteVideos,
} = require("../controllers/videos");
const { uploadCloud } = require("../middlewares/uploadMiddleware");

routers.get("/", getVideos);
routers.post("/", uploadCloud.single("video"), addVideo);
routers.delete("/:id", deleteVideos);

module.exports = routers;
