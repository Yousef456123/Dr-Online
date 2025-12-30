import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import path from 'path';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Multer config for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// @route   POST /api/auth/register
router.post(
  '/register',
  upload.single('avatar'),
  [
    body('fullName', 'Full name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('role', 'Role must be patient, doctor, or admin').isIn(['patient', 'doctor', 'admin']),
  ],
  register
);

// @route   POST /api/auth/login
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  login
);

// @route   GET /api/auth/me
router.get('/me', protect, getMe);

export default router;
