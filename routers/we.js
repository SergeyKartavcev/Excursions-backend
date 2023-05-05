const routers = require("express").Router();

const {
  getWe,
  addWe,
  deleteWe,
} = require("../controllers/we");
const { uploadCloud } = require("../middlewares/uploadMiddleware");

routers.get("/", getWe);
routers.post("/",uploadCloud.single('img'), addWe);
routers.delete("/:weId", deleteWe);

module.exports = routers;
