const Qvest = require("../models/qvests");

const getQvests = async (req, res) => {
  const qvests = await Qvest.find({});
  res.json(qvests);
};

const getQvest = async (req, res) => {
  const eventId = req.params.id;
  Qvest.findById(eventId)
    .then((qvest) => {
      res.json(qvest);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const addQvests = async (req, res) => {
  const { title, route, description, stops, long, time, price } = req.body;
  const img = req.file ? req.file.path : null;

  const result = await Qvest.create({
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

const deleteQvests = async (req, res) => {
  const { qvestId } = req.params;
  const result = await Qvest.deleteOne(qvestId);
  if (result.status) {
    res.status(result.status).json({ message: result.message });
  } else {
    res.status(200).json(result);
  }
};

module.exports = {
  getQvests,
  addQvests,
  deleteQvests,
  getQvest,
};
