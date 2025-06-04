import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    subject: { 
        type: String, 
        required: true 
    },
    chapter: { 
        type: String, 
        required: true 
    },
    class: {  
        type: String, 
        required: true 
    }, 
    unit: { 
        type: String, 
        required: true 
    },
    yearWiseQuestionCount: {
        type: Map,
        of: Number,
        default: {}
    },
    questionSolved: { 
        type: Number, 
        default: 0 
    },
    status: {
        type: String,
        enum: ["Completed", "Not Started", "In Progress"],
        default: "Not Started"
    },
    isWeakChapter: { 
        type: Boolean, 
        default: false 
    }
    }, 
{ timestamps: true}
);

// indexing to prevent duplicates from insertion 
chapterSchema.index({ subject: 1, chapter: 1, class: 1, unit: 1 }, { unique: true });

const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;
