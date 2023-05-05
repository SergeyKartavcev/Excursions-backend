const Home = require("../models/home");

const getHome = async (req, res) => {
    Home.find()
    .then((home) => {
      res.json(home);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const addHome = async (req, res) => {
  const { homeId } = req.params;
  const { title, description  } = req.body;
  const img = req.file ? req.file.path : null;
 
  const result = await Home.create({
    homeId,
    img, 
    title,
    description,
  });
  res.status(201).json(result); 
};

const deleteHome = async (req, res) => {
  const { homeId } = req.params;
  const result = await Home.findById(homeId);
  if (result.status) {
    return next(HttpError(404, "Not found"));
  } await Home.findByIdAndRemove(homeId);
  return res.status(200).json({ message: "інформація видалена" });
};


module.exports = {
    getHome,
    addHome,
    deleteHome,
};
