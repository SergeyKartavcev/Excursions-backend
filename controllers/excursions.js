const Excursion = require("../models/excursion");

const getExcursions = async (req, res) => {
  const excursions = await Excursion.find({});
  res.json(excursions);
};

const getExcursion = async (req, res) => {
  const excursionId = req.params.id;
  Excursion.findById(excursionId)
    .then((excursion) => {
      res.json(excursion);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const addExcursions = async (req, res) => {
  const { title, route, description, stops, long, time, price } = req.body;
  const img = req.file ? req.file.path : null;

  const result = await Excursion.create({
    title,
    img,
    route,
    description,
    stops,
    long,
    time,
    price,
  });
  res.status(201).json(result); // возвращаем созданный объект экскурсии
};

const deleteExcursions = async (req, res) => {
  const { excursionId } = req.params;
  const result = await Excursion.deleteOne(excursionId);
  if (result.status) {
    res.status(result.status).json({ message: result.message });
  } else {
    res.status(200).json(result);
  }
};


module.exports = {
  getExcursions,
  addExcursions,
  deleteExcursions,
  getExcursion,

};
