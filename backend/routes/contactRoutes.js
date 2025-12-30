import express from 'express';
import { body } from 'express-validator';
import {
  submitContactRequest,
  getAllContactRequests,
  getContactRequestById,
  getMyContactRequests,
  bookModerator,
  assignDoctor,
  addReply,
  updateContactStatus,
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/contact
router.post(
  '/',
  [
    body('fullName', 'Full name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('phoneNumber', 'Phone number is required').notEmpty(),
    body('subject', 'Subject is required').notEmpty(),
    body('message', 'Message must be at least 10 characters').isLength({ min: 10 }),
  ],
  submitContactRequest
);

// @route   GET /api/contact
router.get('/', protect, authorize('admin'), getAllContactRequests);

// @route   GET /api/contact/mine
router.get('/mine', protect, getMyContactRequests);

// @route   GET /api/contact/:id
router.get('/:id', protect, getContactRequestById);

// @route   POST /api/contact/:id/book-moderator
router.post('/:id/book-moderator', protect, authorize('admin'), bookModerator);

// @route   POST /api/contact/:id/assign-doctor
router.post('/:id/assign-doctor', protect, authorize('admin'), assignDoctor);

// @route   POST /api/contact/:id/reply
router.post(
  '/:id/reply',
  protect,
  [body('message', 'Message is required').notEmpty()],
  addReply
);

// @route   PUT /api/contact/:id/status
router.put('/:id/status', protect, authorize('admin'), updateContactStatus);

export default router;
