const service = require("../services/excursions");

const getExcursions = async (req, res) => {
  const { page, limit, search } = req.query;
  try {
    const excursions = await service.getExcursions(page, limit, search);

    res.json(excursions);
  } catch (error) {
    next(error);
  }
};

const addExcursions = async (req, res) =>{
    const { excursionId } = req.params;
    const data = req.file ? { img: req.file.path, ...req.body } : req.body;
    const result = await service.createExcursion(excursionId, data);
    const excursion = JSON.parse(JSON.stringify(result)); // преобразуем img в объект
    res.status(201).json(excursion);
}

const deleteExcursions = async (req, res) => {
    const { excursionId } = req.params;
    const result = await service.removeExcursion(excursionId);
    
    if (result.status) {
      res.status(result.status).json({ message: result.message });
    } else {
      res.status(200).json(result);
    }
  };
module.exports = { getExcursions, addExcursions, deleteExcursions };
