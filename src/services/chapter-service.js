import ChapterRepository from "../repository/chapter-repository.js";
import logger from "../utils/logger.js";

class ChapterService {
  constructor() {
    this.chapterRepository = new ChapterRepository();
  }

  async getAllChapters(queryParams) {
    try {
      const { filters, page, limit } = queryParams;
      const { chapters, totalChapters, currentPage, totalPages } =
        await this.chapterRepository.findChapters(filters, page, limit);
      return {
        chapters,
        totalChapters,
        currentPage,
        totalPages,
      };
    } catch (error) {
      logger.error("Error in getAllChapters:", error);
      throw error;
    }
  }

  async getChapterById(id) {
    try {
      const chapter = await this.chapterRepository.findChapterById(id);
      if (!chapter) {
        throw new Error("Chapter not found");
      }
      return chapter;
    } catch (error) {
      logger.error("Error in getChapterById:", error);
      throw error;
    }
  }

  async uploadChaptersFromJSON(jsonArray) {
    try {
      const inserted = [];
      const failed = [];

      for (const chapter of jsonArray) {
        try {
          const duplicate = await this.chapterRepository.isDuplicate(chapter);
          if (duplicate) {
            continue;
          }

          await this.chapterRepository.insertChapters(chapter);
          inserted.push(chapter);
        } catch (err) {
          failed.push({ chapter: chapter.chapter, reason: err.message });
        }
      }

      return {
        insertedCount: inserted.length,
        inserted,
        failedCount: failed.length,
        failed,
      };
    } catch (error) {
      logger.error("Error in uploadChaptersFromJSON in service layer:", error);
      throw error;
    }
  }
}

export default ChapterService;
