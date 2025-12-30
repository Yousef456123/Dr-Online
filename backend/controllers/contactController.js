import ContactRequest from '../models/ContactRequest.js';
import User from '../models/User.js';
import ModeratorBooking from '../models/ModeratorBooking.js';
import { validationResult } from 'express-validator';
import {
  sendModeratorBookedEmail,
  sendModeratorAssignmentEmail,
  sendDoctorAssignmentEmail,
} from '../utils/emailService.js';

// @desc    Submit contact request
// @route   POST /api/contact
// @access  Public
export const submitContactRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullName, email, phoneNumber, subject, message, requestType, patient } = req.body;

    const contactRequest = await ContactRequest.create({
      fullName,
      email,
      phoneNumber,
      subject,
      message,
      requestType,
      patient: patient || null,
    });

    res.status(201).json({
      success: true,
      message: 'Contact request submitted successfully',
      contactRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact requests
// @route   GET /api/contact
// @access  Private/Admin
export const getAllContactRequests = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const contactRequests = await ContactRequest.find(query)
      .populate('assignedModerator', 'fullName email')
      .populate('assignedDoctor', 'fullName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contactRequests.length,
      contactRequests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact requests for current user
// @route   GET /api/contact/mine
// @access  Private
export const getMyContactRequests = async (req, res, next) => {
  try {
    // Return contact requests where this user is the patient OR the email matches
    const query = {
      $or: [{ patient: req.user.id }, { email: req.user.email }],
    };

    const contactRequests = await ContactRequest.find(query)
      .populate('assignedModerator', 'fullName email')
      .populate('assignedDoctor', 'fullName email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: contactRequests.length, contactRequests });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact request
// @route   GET /api/contact/:id
// @access  Private
export const getContactRequestById = async (req, res, next) => {
  try {
    const contactRequest = await ContactRequest.findById(req.params.id)
      .populate('assignedModerator', 'fullName email')
      .populate('assignedDoctor', 'fullName email')
      .populate('replies.sender', 'fullName email role');

    if (!contactRequest) {
      return res.status(404).json({ success: false, message: 'Contact request not found' });
    }

    res.status(200).json({
      success: true,
      contactRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Book moderator for contact request
// @route   POST /api/contact/:id/book-moderator
// @access  Private/Admin
export const bookModerator = async (req, res, next) => {
  try {
    const contactRequest = await ContactRequest.findById(req.params.id);

    if (!contactRequest) {
      return res.status(404).json({ success: false, message: 'Contact request not found' });
    }

    // Get available moderators (users with role 'admin' or special moderator role)
    const moderators = await User.find({
      $or: [{ role: 'admin' }, { role: 'doctor' }],
    });

    if (moderators.length === 0) {
      return res.status(400).json({ success: false, message: 'No moderators available' });
    }

    // Assign first available moderator (can be enhanced with load balancing)
    const assignedModerator = moderators[0];

    contactRequest.assignedModerator = assignedModerator._id;
    contactRequest.status = 'moderator-assigned';
    await contactRequest.save();

    // Create moderator booking
    // Determine patient: prefer contactRequest.patient, else try matching by email, else leave null
    let patientId = contactRequest.patient || null;
    if (!patientId) {
      const patientUser = await User.findOne({ email: contactRequest.email });
      if (patientUser) patientId = patientUser._id;
    }

    const booking = await ModeratorBooking.create({
      patient: patientId,
      moderator: assignedModerator._id,
      contactRequest: contactRequest._id,
      topic: contactRequest.subject,
    });

    // Send email notifications
    await sendModeratorBookedEmail(contactRequest.email, contactRequest.fullName);
    await sendModeratorAssignmentEmail(assignedModerator.email, {
      fullName: contactRequest.fullName,
      email: contactRequest.email,
      phoneNumber: contactRequest.phoneNumber,
      subject: contactRequest.subject,
      message: contactRequest.message,
    });

    res.status(200).json({
      success: true,
      message: 'Moderator booked successfully',
      contactRequest,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign doctor to contact request
// @route   POST /api/contact/:id/assign-doctor
// @access  Private/Admin
export const assignDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.body;

    const contactRequest = await ContactRequest.findById(req.params.id);

    if (!contactRequest) {
      return res.status(404).json({ success: false, message: 'Contact request not found' });
    }

    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== 'doctor') {
      return res.status(400).json({ success: false, message: 'Invalid doctor ID' });
    }

    contactRequest.assignedDoctor = doctorId;
    contactRequest.status = 'doctor-assigned';
    await contactRequest.save();

    // Send email to doctor
    await sendDoctorAssignmentEmail(doctor.email, {
      fullName: contactRequest.fullName,
      email: contactRequest.email,
      phoneNumber: contactRequest.phoneNumber,
      subject: contactRequest.subject,
      message: contactRequest.message,
    });

    res.status(200).json({
      success: true,
      message: 'Doctor assigned successfully',
      contactRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add reply to contact request
// @route   POST /api/contact/:id/reply
// @access  Private
export const addReply = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { message } = req.body;
    let contactRequest = await ContactRequest.findById(req.params.id);

    if (!contactRequest) {
      return res.status(404).json({ success: false, message: 'Contact request not found' });
    }

    // Get user info
    const user = await User.findById(req.user.id);

    contactRequest.replies.push({
      sender: req.user.id,
      senderRole: user.role,
      message,
    });

    contactRequest = await contactRequest.save();
    await contactRequest.populate('replies.sender', 'fullName email');

    res.status(201).json({
      success: true,
      contactRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact request status
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
export const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const contactRequest = await ContactRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contactRequest) {
      return res.status(404).json({ success: false, message: 'Contact request not found' });
    }

    res.status(200).json({
      success: true,
      contactRequest,
    });
  } catch (error) {
    next(error);
  }
};
