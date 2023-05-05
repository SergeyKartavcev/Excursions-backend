const Qvest = require("../models/qvests");

const getQvests = async (req, res) => {
  const qvests = await Qvest.find({});
  res.json(qvests);
};



async function getQvest(req, res, next) {
  const { qvestId } = req.params;
  const qvest = await Qvest.findById(qvestId);

  if (!qvest) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(qvest);
}

const addQvests = async (req, res) => {
  const { qvestId } = req.params;
  const { title, whose, location, description, bring, price } = req.body;
  const img = req.file ? req.file.path : null;

  const result = await Qvest.create({
    qvestId,
    title,
    img,
    whose,
    location,
    description,
    bring,
    price,
  });
  res.status(201).json(result); // возвращаем созданный объект экскурсии
};


const deleteQvests = async (req, res) => {
  const { qvestId } = req.params;
  const qvest = await Qvest.findById(qvestId);

  if (!qvest) {
    return next(HttpError(404, "Not found"));
  }
 await Qvest.findByIdAndRemove(qvestId);
  return res.status(200).json({ message: "Квест видалений" });
};

module.exports = {
  getQvests,
  addQvests,
  deleteQvests,
  getQvest,
};
