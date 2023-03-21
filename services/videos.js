const { json } = require("express");
const Video = require("../models/video");

const createVideo = async (title, video, description) => {
  const videoCard = { title, video: JSON.stringify(video), description };
  return await Video.create(videoCard);
};

const getVideos = async (page = 1, limit = 6, search = "") => {
  if (search.length > 0) {
    return await Video.find({ title: { $regex: search, $options: "i" } })
      .sort({ date: -1 })
      .skip((parseInt(page) - 1) * limit)
      .limit(limit);
  } else {
    return await Video.find({})
      .sort({ date: -1 })
      .skip((parseInt(page) - 1) * limit)
      .limit(limit);
  }
};

const removeVideo = async (videoId) => {
  const remove = await Video.findById(videoId);

  if (!remove) {
    return json(404, "No such in database");
  }

  return await Video.findOneAndDelete({ _id: videoId });
};

module.exports = { createVideo, getVideos, removeVideo };
