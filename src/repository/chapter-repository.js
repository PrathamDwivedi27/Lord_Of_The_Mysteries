import Chapter from "../models/chapter-model.js";
import logger from "../utils/logger.js";

class ChapterRepository {
    constructor() {
        this.chapterModel = Chapter;
    }

    async findChapters(filters, page, limit){
        try {
            const matchStage={};
            if (filters.class) matchStage.class=filters.class;
            if (filters.subject) matchStage.subject=filters.subject;
            if (filters.unit) matchStage.unit=filters.unit;
            if (filters.status) matchStage.status=filters.status;
            if (filters.isWeakChapter !== undefined) matchStage.isWeakChapter = filters.isWeakChapter;

            const skip= (page-1)*limit;
            const chapters = await this.chapterModel.aggregate([
                { $match: matchStage },
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit }
            ]);
            
    
            const totalChapters = await this.chapterModel.countDocuments(matchStage);
    
            return {
                chapters,
                totalChapters,
                currentPage: page,
                totalPages: Math.ceil(totalChapters / limit)
            };
           
        } catch (error) {
            logger.error("Error in findChapters:", error);
            throw error;
        }
    }

    async findChapterById(id) {
        try {
            const chapter= await this.chapterModel.findById(id);
            return chapter;
        } catch (error) {
            logger.error("Error in findChapterById:", error);
            throw error;
            
        }

  }

  async insertChapters(chapterData) {
      try {
        const chapter = new this.chapterModel(chapterData);
        await chapter.validate();
        return await chapter.save();
      } catch (error) {
        logger.error("Error in insertChapters:", error);
        throw error;
      }
  }

  async isDuplicate(chapterData) {
    const { subject, chapter, class: className, unit } = chapterData;
    return await this.chapterModel.findOne({ subject, chapter, class: className, unit });
  }

}

export default ChapterRepository;