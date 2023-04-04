const MapModel = require('../models/map')

const getMap = async (req, res) => {
  try {
    const map = await MapModel.find({});
    res.json(map);
  } catch (error) {
    next(error);
  }
};

const addMap = async (req, res) => {
  const {title, link, location, zoom }= req.body;
  const result = await MapModel.create({title, link, location, zoom });
  res.status(201).json(result);
};


const deleteMap = async (req, res, next) => {
  const { mapId } = req.params;
  const result = await MapModel.deleteOne(mapId);
  if (result.status) {
    res.status(result.status).json({ message: result.message });
  } else {
    res.status(200).json(result);
  }
};
module.exports = { getMap, addMap, deleteMap };
