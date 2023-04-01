const routers = require("express").Router();
// const tryCatchWrapper = require('../helpers/helpers')
const {
  getVideos,
  addVideo,
  deleteVideos,
} = require("../controllers/videos");
// const { uploadCloud } = require("../middlewares/uploadMiddleware");

routers.get("/", getVideos);
routers.post("/", addVideo);
routers.delete("/:id", deleteVideos);

module.exports = routers;
