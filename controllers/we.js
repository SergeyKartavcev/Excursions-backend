const We = require("../models/we");



const getWe = async (req, res) => {
    We.find()
    .then((we) => {
      res.json(we);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const addWe = async (req, res) => {
  const { weId } = req.params;
  const { title, description, gid,  } = req.body;
  const img = req.file ? req.file.path : null;
 
  const result = await We.create({
    weId,
    title,
    description,
    gid,
    img,  
  });
  res.status(201).json(result); 
};

const deleteWe = async (req, res) => {
  const { weId } = req.params;
  const result = await We.findById(weId);
  if (result.status) {
    return next(HttpError(404, "Not found"));
  } await We.findByIdAndRemove(weId);
  return res.status(200).json({ message: "інформація видалена" });
};


module.exports = {
    getWe,
    addWe,
    deleteWe,
};
