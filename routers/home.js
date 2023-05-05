const routers = require("express").Router();

const {
  getHome,
  addHome,
  deleteHome,
} = require("../controllers/home");
const { uploadCloud } = require("../middlewares/uploadMiddleware");

routers.get("/", getHome);
routers.post("/",uploadCloud.single('img'), addHome);
routers.delete("/:weId", deleteHome);

module.exports = routers;
