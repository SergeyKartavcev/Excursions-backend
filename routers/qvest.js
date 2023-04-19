const routers = require("express").Router();
const {
    getQvests, addQvests, deleteQvests, getQvest
} = require("../controllers/qvests");
const { uploadCloud } = require("../middlewares/uploadMiddleware");

routers.get("/", getQvests);
routers.get("/:id",getQvest);
routers.post("/", uploadCloud.single('img'), addQvests);
routers.delete("/:id", deleteQvests);

module.exports = routers;


