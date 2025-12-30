import Discussion from '../models/Discussion.js';
import { validationResult } from 'express-validator';

// @desc    Get all discussions
// @route   GET /api/discussions
// @access  Public
export const getAllDiscussions = async (req, res, next) => {
  try {
    const { category, sortBy } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    let sort = { createdAt: -1 };
    if (sortBy === 'popular') {
      sort = { views: -1 };
    } else if (sortBy === 'trending') {
      sort = { likes: -1 };
    }

    const discussions = await Discussion.find(query)
      .populate('author', 'fullName email role')
      .populate('replies.user', 'fullName email')
      .sort(sort);

    res.status(200).json({
      success: true,
      count: discussions.length,
      discussions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new discussion
// @route   POST /api/discussions
// @access  Private
export const createDiscussion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, category, tags } = req.body;

    const discussion = await Discussion.create({
      title,
      description,
      category,
      tags: tags || [],
      author: req.user.id,
    });

    const populatedDiscussion = await discussion.populate('author', 'fullName email role');

    res.status(201).json({
      success: true,
      discussion: populatedDiscussion,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single discussion
// @route   GET /api/discussions/:id
// @access  Public
export const getDiscussionById = async (req, res, next) => {
  try {
    let discussion = await Discussion.findById(req.params.id)
      .populate('author', 'fullName email role')
      .populate('replies.user', 'fullName email');

    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Discussion not found' });
    }

    // Increment views
    discussion.views += 1;
    await discussion.save();

    res.status(200).json({
      success: true,
      discussion,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update discussion
// @route   PUT /api/discussions/:id
// @access  Private
export const updateDiscussion = async (req, res, next) => {
  try {
    let discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Discussion not found' });
    }

    // Check if user is author or admin
    if (discussion.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this discussion' });
    }

    const { title, description, category, status } = req.body;

    if (title) discussion.title = title;
    if (description) discussion.description = description;
    if (category) discussion.category = category;
    if (status) discussion.status = status;

    discussion = await discussion.save();

    res.status(200).json({
      success: true,
      discussion,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete discussion
// @route   DELETE /api/discussions/:id
// @access  Private
export const deleteDiscussion = async (req, res, next) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Discussion not found' });
    }

    // Check if user is author or admin
    if (discussion.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this discussion' });
    }

    await Discussion.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Discussion deleted',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add reply to discussion
// @route   POST /api/discussions/:id/reply
// @access  Private
export const addReply = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { content } = req.body;
    let discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Discussion not found' });
    }

    discussion.replies.push({
      user: req.user.id,
      content,
    });

    discussion = await discussion.save();
    await discussion.populate('replies.user', 'fullName email');

    res.status(201).json({
      success: true,
      discussion,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like discussion
// @route   POST /api/discussions/:id/like
// @access  Private
export const likeDiscussion = async (req, res, next) => {
  try {
    let discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Discussion not found' });
    }

    // Check if user already liked
    if (discussion.likes.includes(req.user.id)) {
      // Remove like
      discussion.likes = discussion.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      // Add like
      discussion.likes.push(req.user.id);
    }

    discussion = await discussion.save();

    res.status(200).json({
      success: true,
      discussion,
      liked: discussion.likes.includes(req.user.id),
    });
  } catch (error) {
    next(error);
  }
};
