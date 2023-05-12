const Excursion = require("../models/excursion");
const { HttpError } = require("../helpers/helpers");

const getExcursions = async (req, res) => {
  const excursions = await Excursion.find({});
  res.json(excursions);
};

async function getExcursion(req, res, next) {
  const { excursionId } = req.params;
  const excursion = await Excursion.findById(excursionId);

  if (!excursion) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(excursion);
}



const addExcursions = async (req, res) => {
  const { excursionId } = req.params;
  const { title, route, description, stops, long, time, price } = req.body;
  const img = req.file ? req.file.path : null;

  const result = await Excursion.create({
    excursionId,
    title,
    img,
    route,
    description,
    stops,
    long,
    time,
    price,
  });
  res.status(201).json(result); 
};

const deleteExcursions = async (req, res) => {
  const { excursionId } = req.params;
  const excursion = await Excursion.findById(excursionId);

  if (!excursion) {
    return next(HttpError(404, "Not found"));
  }
 await Excursion.findByIdAndRemove(excursionId);
  return res.status(200).json({ message: "Екскурсія видалена" });
};


module.exports = {
  getExcursions,
  addExcursions,
  deleteExcursions,
  getExcursion,

};
