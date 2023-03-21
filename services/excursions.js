const { json } = require("express");
const Excursion = require("../models/excursion");

const createExcursion = async (title, img, price, description) => {
  const excursion = { title, img: JSON.stringify(img), price, description };
  return await Excursion.create(excursion);
};

const getExcursions = async (page = 1, limit = 6, search = "") => {
  if (search.length > 0) {
    return await Excursion.find({ title: { $regex: search, $options: "i" } })
      .sort({ date: -1 })
      .skip((parseInt(page) - 1) * limit)
      .limit(limit);
  } else {
    return await Excursion.find({})
      .sort({ date: -1 })
      .skip((parseInt(page) - 1) * limit)
      .limit(limit);
  }
};

const removeExcursion = async (excursionId) => {
    const remove = await Excursion.findById(excursionId);
  
    if (!remove) {
      return json(404, "No such in database");
    }
  
    return await Excursion.findOneAndDelete({ _id: excursionId });
  };
module.exports = { createExcursion, getExcursions, removeExcursion };
