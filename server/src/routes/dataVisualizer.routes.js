import { Router } from 'express';
import { getFileData } from '../controllers/jsonProcessor.controller.js';
import { passFileData } from '../middlewares/fileData.middleware.js';

const router = Router();

// Route to get the file data
router.get('/file-data', passFileData, getFileData);

export default router;