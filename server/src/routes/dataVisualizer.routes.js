import { Router } from 'express';
import { getFileData, uploadFileData } from '../controllers/jsonProcessor.controller.js';
import { passFileData } from '../middlewares/fileData.middleware.js';

const router = Router();

// Route to get the file data
router.get('/file-data', passFileData, getFileData);
router.post('/file-data', uploadFileData);

export default router;