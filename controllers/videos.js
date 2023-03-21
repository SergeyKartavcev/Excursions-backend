const service = require("../services/videos");

const getVideos = async (req, res) => {
  const { page, limit, search } = req.query;
  try {
    const videos = await service.getVideos(page, limit, search);

    res.json(videos);
  } catch (error) {
    next(error);
  }
};

const addVideo = async (req, res) =>{
    const { videoId } = req.params;
    const data = req.file ? { video: req.file.path, ...req.body } : req.body;
    const result = await service.createVideo(videoId, data);
    const videoCard = JSON.parse(JSON.stringify(result)); // преобразуем img в объект
    res.status(201).json(videoCard);
}

const deleteVideos = async (req, res) => {
    const { videoId } = req.params;
    const result = await service.removeVideo(videoId);
    
    if (result.status) {
      res.status(result.status).json({ message: result.message });
    } else {
      res.status(200).json(result);
    }
  };

module.exports = { getVideos, addVideo, deleteVideos };
