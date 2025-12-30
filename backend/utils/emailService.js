import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

// Create transporter
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: config.email.user,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendModeratorBookedEmail = async (userEmail, userName) => {
  const subject = 'Moderator Booked - Dr. Online';
  const htmlContent = `
    <h2>Hello ${userName},</h2>
    <p>Your moderator has been successfully booked!</p>
    <p>A doctor from our team will review your request and contact you soon with further assistance.</p>
    <p>Thank you for using Dr. Online.</p>
    <p>Best regards,<br/>Dr. Online Team</p>
  `;

  return sendEmail(userEmail, subject, htmlContent);
};

export const sendModeratorAssignmentEmail = async (moderatorEmail, requestDetails) => {
  const subject = 'New Contact Request Assigned - Dr. Online';
  const htmlContent = `
    <h2>Hello,</h2>
    <p>A new contact request has been assigned to you:</p>
    <p><strong>Patient Name:</strong> ${requestDetails.fullName}</p>
    <p><strong>Email:</strong> ${requestDetails.email}</p>
    <p><strong>Phone:</strong> ${requestDetails.phoneNumber}</p>
    <p><strong>Subject:</strong> ${requestDetails.subject}</p>
    <p><strong>Message:</strong> ${requestDetails.message}</p>
    <p>Please review and respond to this request accordingly.</p>
    <p>Best regards,<br/>Dr. Online Team</p>
  `;

  return sendEmail(moderatorEmail, subject, htmlContent);
};

export const sendDoctorAssignmentEmail = async (doctorEmail, requestDetails) => {
  const subject = 'Patient Referral - Dr. Online';
  const htmlContent = `
    <h2>Hello Doctor,</h2>
    <p>A patient has been referred to you for consultation:</p>
    <p><strong>Patient Name:</strong> ${requestDetails.fullName}</p>
    <p><strong>Email:</strong> ${requestDetails.email}</p>
    <p><strong>Phone:</strong> ${requestDetails.phoneNumber}</p>
    <p><strong>Subject:</strong> ${requestDetails.subject}</p>
    <p><strong>Message:</strong> ${requestDetails.message}</p>
    <p>Please contact the patient to proceed with the consultation.</p>
    <p>Best regards,<br/>Dr. Online Team</p>
  `;

  return sendEmail(doctorEmail, subject, htmlContent);
};

export default sendEmail;
