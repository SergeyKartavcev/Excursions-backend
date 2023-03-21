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
  const {title, map }= req.body;
  const result = await MapModel.create({title, map});
  res.status(201).json(result);
};

module.exports = { getMap, addMap };
