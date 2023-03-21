const routers = require("express").Router();
const {
  getExcursions,
  addExcursions,
  deleteExcursions,
} = require("../controllers/excursions");
const { uploadCloud } = require("../middlewares/uploadMiddleware");

routers.get("/", getExcursions);
routers.post("/", uploadCloud.single("img"), addExcursions);
routers.delete("/:id", deleteExcursions);

module.exports = routers;
