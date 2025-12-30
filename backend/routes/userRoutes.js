import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllUsers,
  getUserById,
  getAllDoctors,
  updateUser,
  deleteUser,
  uploadAvatar,
  removeAvatar,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Multer config for avatar uploads (same pattern as authRoutes)
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

// @route   GET /api/users
router.get('/', protect, authorize('admin'), getAllUsers);

// @route   GET /api/users/role/doctor
router.get('/role/doctor', getAllDoctors);

// @route   GET /api/users/:id
router.get('/:id', getUserById);

// @route   PUT /api/users/:id
router.put('/:id', protect, updateUser);

// @route   DELETE /api/users/:id
router.delete('/:id', protect, deleteUser);

// @route   POST /api/users/:id/avatar
router.post('/:id/avatar', protect, upload.single('avatar'), uploadAvatar);

// @route   DELETE /api/users/:id/avatar
router.delete('/:id/avatar', protect, removeAvatar);

export default router;
