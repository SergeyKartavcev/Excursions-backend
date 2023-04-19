const routers = require("express").Router();
const {
    getEvents, addEvents, deleteEvents, getEvent, 
} = require("../controllers/events");
const { uploadCloud } = require("../middlewares/uploadMiddleware");

routers.get("/", getEvents);
routers.get("/:id",getEvent);
routers.post("/", uploadCloud.single('img'), addEvents);
routers.delete("/:id", deleteEvents);


module.exports = routers;