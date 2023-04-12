const routers = require("express").Router();
const { createReview, getReviews, deleteReview } = require("../controllers/reviews");


routers.get("/", getReviews);
routers.post("/", createReview);
routers.delete("/:id", deleteReview);

module.exports = routers;
