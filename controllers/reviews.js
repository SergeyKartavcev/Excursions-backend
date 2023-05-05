const Review = require('../models/review');


const createReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { author, rating, comment } = req.body;
    const review = new Review({ reviewId, author, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const result = await Review.findById(reviewId);
      if (result.status) {
        return next(HttpError(404, "Not found"));
      } await Review.findByIdAndRemove(reviewId);
      return res.status(200).json({ message: "відгук видалено" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

module.exports = {
  createReview,
  getReviews,
  deleteReview,
};
