import express from 'express'
import { getAllChapters, getChapterById, uploadChapters } from '../../controllers/chapter-controller.js';
import { isAdmin } from '../../middleware/isAdmin.js';
import upload from '../../middleware/multer.js';
import { rateLimiter } from '../../middleware/rate-limiter.js';


const router=express.Router();
router.get('/chapters',rateLimiter,getAllChapters);
router.get('/chapters/:id',rateLimiter,getChapterById);
router.post('/chapters',isAdmin,upload.single('file'),uploadChapters);


export default router;