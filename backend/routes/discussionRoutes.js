import express from 'express';
import { body } from 'express-validator';
import {
  getAllDiscussions,
  createDiscussion,
  getDiscussionById,
  updateDiscussion,
  deleteDiscussion,
  addReply,
  likeDiscussion,
} from '../controllers/discussionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/discussions
router.get('/', getAllDiscussions);

// @route   POST /api/discussions
router.post(
  '/',
  protect,
  [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
  ],
  createDiscussion
);

// @route   GET /api/discussions/:id
router.get('/:id', getDiscussionById);

// @route   PUT /api/discussions/:id
router.put('/:id', protect, updateDiscussion);

// @route   DELETE /api/discussions/:id
router.delete('/:id', protect, deleteDiscussion);

// @route   POST /api/discussions/:id/reply
router.post(
  '/:id/reply',
  protect,
  [body('content', 'Content is required').notEmpty()],
  addReply
);

// @route   POST /api/discussions/:id/like
router.post('/:id/like', protect, likeDiscussion);

export default router;
