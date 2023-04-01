const Video = require("../models/video");

const getVideos = async (req, res, next) => {
  const video = await Video.find({});
  res.json(video);
};

const addVideo = async (req, res, next) => {
  const { title, video, description } = req.body;
  const result = await Video.create({ title, video, description });
  res.status(201).json(result);
};

const deleteVideos = async (req, res, next) => {
  const { videoId } = req.params;
  const result = await Video.deleteOne(videoId);
  if (result.status) {
    res.status(result.status).json({ message: result.message });
  } else {
    res.status(200).json(result);
  }
};

module.exports = { getVideos, addVideo, deleteVideos };
