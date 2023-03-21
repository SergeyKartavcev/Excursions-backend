const routers = require("express").Router();
const { getMap, addMap } = require("../controllers/map");


routers.get("/", getMap);
routers.post("/", addMap);


module.exports = routers;
