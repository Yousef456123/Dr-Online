import Study from '../models/Study.js';
import { validationResult } from 'express-validator';

// @desc    Get all studies
// @route   GET /api/studies
// @access  Public
export const getAllStudies = async (req, res, next) => {
  try {
    const { condition, sortBy } = req.query;
    let query = {};

    if (condition) {
      query.condition = { $regex: condition, $options: 'i' };
    }

    let sort = { publicationDate: -1 };
    if (sortBy === 'popular') {
      sort = { likes: -1 };
    }

    const studies = await Study.find(query)
      .populate('author', 'fullName email specialization')
      .sort(sort);

    res.status(200).json({
      success: true,
      count: studies.length,
      studies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new study
// @route   POST /api/studies
// @access  Private (Doctors only)
export const createStudy = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Allow doctors and admins to create studies
    if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only doctors or admins can create studies' });
    }

    const { title, description, condition, source, content, tags } = req.body;

    const study = await Study.create({
      title,
      description,
      condition,
      source,
      content,
      tags: tags || [],
      author: req.user.id,
    });

    const populatedStudy = await study.populate('author', 'fullName email specialization');

    res.status(201).json({
      success: true,
      study: populatedStudy,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single study
// @route   GET /api/studies/:id
// @access  Public
export const getStudyById = async (req, res, next) => {
  try {
    const study = await Study.findById(req.params.id).populate('author', 'fullName email specialization');

    if (!study) {
      return res.status(404).json({ success: false, message: 'Study not found' });
    }

    res.status(200).json({
      success: true,
      study,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update study
// @route   PUT /api/studies/:id
// @access  Private
export const updateStudy = async (req, res, next) => {
  try {
    let study = await Study.findById(req.params.id);

    if (!study) {
      return res.status(404).json({ success: false, message: 'Study not found' });
    }

    // Check if user is author or admin
    if (study.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this study' });
    }

    const { title, description, condition, source, content, tags } = req.body;

    if (title) study.title = title;
    if (description) study.description = description;
    if (condition) study.condition = condition;
    if (source) study.source = source;
    if (content) study.content = content;
    if (tags) study.tags = tags;

    study = await study.save();

    res.status(200).json({
      success: true,
      study,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete study
// @route   DELETE /api/studies/:id
// @access  Private
export const deleteStudy = async (req, res, next) => {
  try {
    const study = await Study.findById(req.params.id);

    if (!study) {
      return res.status(404).json({ success: false, message: 'Study not found' });
    }

    // Check if user is author or admin
    if (study.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this study' });
    }

    await Study.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Study deleted',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like study
// @route   POST /api/studies/:id/like
// @access  Private
export const likeStudy = async (req, res, next) => {
  try {
    let study = await Study.findById(req.params.id);

    if (!study) {
      return res.status(404).json({ success: false, message: 'Study not found' });
    }

    // Check if user already liked
    if (study.likes.includes(req.user.id)) {
      // Remove like
      study.likes = study.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      // Add like
      study.likes.push(req.user.id);
    }

    study = await study.save();

    res.status(200).json({
      success: true,
      study,
      liked: study.likes.includes(req.user.id),
    });
  } catch (error) {
    next(error);
  }
};
