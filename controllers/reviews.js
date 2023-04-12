const Review = require('../models/review');

// Создание отзыва
const createReview = async (req, res) => {
  try {
    const { author, rating, comment } = req.body;
    const review = new Review({ author, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Получение всех отзывов
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удаление отзыва
const deleteReview = async (req, res) => {
    try {
      const { id } = req.params;
      const review = await Review.findById(id);
      if (!review) throw new Error('Отзыв не найден');
      await review.deleteOne();
      res.json({ message: 'Отзыв удален' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

module.exports = {
  createReview,
  getReviews,
  deleteReview,
};
