const routers = require("express").Router();
const { getMap, addMap, deleteMap } = require("../controllers/map");


routers.get("/", getMap);
routers.post("/", addMap);
routers.delete("/:id", deleteMap);

module.exports = routers;
