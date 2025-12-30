import express from 'express';
import { body } from 'express-validator';
import {
  getAllStudies,
  createStudy,
  getStudyById,
  updateStudy,
  deleteStudy,
  likeStudy,
} from '../controllers/studyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/studies
router.get('/', getAllStudies);

// @route   POST /api/studies
router.post(
  '/',
  protect,
  authorize('doctor', 'admin'),
  [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('condition', 'Condition is required').notEmpty(),
  ],
  createStudy
);

// @route   GET /api/studies/:id
router.get('/:id', getStudyById);

// @route   PUT /api/studies/:id
router.put('/:id', protect, updateStudy);

// @route   DELETE /api/studies/:id
router.delete('/:id', protect, deleteStudy);

// @route   POST /api/studies/:id/like
router.post('/:id/like', protect, likeStudy);

export default router;
