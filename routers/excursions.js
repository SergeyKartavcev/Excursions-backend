const routers = require("express").Router();
const {
    getExcursions, addExcursions, deleteExcursions, getExcursion, 
} = require("../controllers/excursions");
const { uploadCloud } = require("../middlewares/uploadMiddleware");

routers.get("/", getExcursions);
routers.get("/:excursionId",getExcursion);
routers.post("/", uploadCloud.single('img'), addExcursions);
routers.delete("/:excursionId", deleteExcursions);


module.exports = routers;
