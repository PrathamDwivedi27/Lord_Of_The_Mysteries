import ChapterService from "../services/chapter-service.js";
import logger from "../utils/logger.js";
import redisClient from "../config/redis.js";


const chapterService = new ChapterService();

const getAllChapters = async (req, res) => {
  try {
    const filters = {
      class: req.query.class,
      unit: req.query.unit,
      status: req.query.status,
      subject: req.query.subject,
      isWeakChapter: req.query.weakChapters === "true",
    };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const cacheKey = `chapters:${JSON.stringify({ filters, page, limit })}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Serving from Redis cache");
      return res.status(200).json({
        success: true,
        data: JSON.parse(cachedData),
        message: "Chapters retrieved from cache",
        error: null,
      });
    }

    const data = await chapterService.getAllChapters({ filters, page, limit });
    await redisClient.setex(cacheKey, 3600, JSON.stringify(data));

    return res.status(200).json({ 
        success: true, 
        data: data ,
        message: "Chapters retrieved successfully",
        error: null,
    });
  } catch (error) {
    logger.error("getAllChapters error:", error);
    return res.status(500).json({ 
        success: false, 
        message:  "Error retrieving chapters",
        data:{},
        error: error.message,
    });
  }
};

const getChapterById = async (req, res) => {
  try {
    const chapter = await chapterService.getChapterById(req.params.id);
    return res.status(200).json({ 
        success: true, 
        data: chapter,
        message: "Chapter retrieved successfully",
        error: null,
    });
  } catch (error) {
    logger.error("getChapterById error:", error);
    return res.status(404).json({ 
        success: false, 
        message: "Chapter not found", 
        data: {},
        error: error.message,
    });
  }
};

const uploadChapters = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ 
            success: false, 
            message: "No file uploaded" ,
            error: "Please upload a JSON file containing chapters",
        });
    }

    const jsonArray = JSON.parse(req.file.buffer.toString());

    if (!Array.isArray(jsonArray)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Uploaded JSON must be an array of chapters",
        });
    }

    const result = await chapterService.uploadChaptersFromJSON(jsonArray);
    const keys = await redisClient.keys("chapters:*");
    if (keys.length) {
        await redisClient.del(keys);
        logger.info("Cache cleared for chapters");
    }
    

    return res.status(201).json({
      success: true,
      message: "Chapters upload processed",
      data: result,
      error: null,
    });
  } catch (error) {
    logger.error("uploadChapters error:", error);
    return res.status(500).json({ 
        success: false, 
        message: error.message ,
        data: {},
        error: "Error processing chapter upload",
    });
  }
};

export {
    getAllChapters,
    getChapterById,
    uploadChapters
}
