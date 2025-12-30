# Dr. Online Backend API

## Overview
Node.js/Express backend for the Dr. Online healthcare communication platform with MongoDB database integration.

## Features
- ✅ User authentication (Login/Signup) with JWT
- ✅ Role-based access control (Patient, Doctor, Admin)
- ✅ CRUD operations for Discussions, Studies, and Contact Requests
- ✅ Password hashing with bcryptjs
- ✅ Data validation using express-validator
- ✅ Email notifications (Bonus feature)
- ✅ Error handling middleware
- ✅ CORS enabled for frontend integration

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
cp .env.example .env
```

4. **Configure environment variables in .env:**
```
MONGODB_URI=mongodb://localhost:27017/dr-online
PORT=5000
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Running the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/role/doctor` - Get all doctors
- `PUT /api/users/:id` - Update user profile (Protected)
- `DELETE /api/users/:id` - Delete user (Protected)

### Discussions
- `GET /api/discussions` - Get all discussions
- `POST /api/discussions` - Create discussion (Protected)
- `GET /api/discussions/:id` - Get single discussion
- `PUT /api/discussions/:id` - Update discussion (Protected)
- `DELETE /api/discussions/:id` - Delete discussion (Protected)
- `POST /api/discussions/:id/reply` - Add reply (Protected)
- `POST /api/discussions/:id/like` - Like discussion (Protected)

### Studies
- `GET /api/studies` - Get all studies
- `POST /api/studies` - Create study (Doctor only)
- `GET /api/studies/:id` - Get single study
- `PUT /api/studies/:id` - Update study (Protected)
- `DELETE /api/studies/:id` - Delete study (Protected)
- `POST /api/studies/:id/like` - Like study (Protected)

### Contact Requests
- `POST /api/contact` - Submit contact request (Public)
- `GET /api/contact` - Get all contact requests (Admin only)
- `GET /api/contact/:id` - Get single contact request (Protected)
- `POST /api/contact/:id/book-moderator` - Book moderator (Admin only)
- `POST /api/contact/:id/assign-doctor` - Assign doctor (Admin only)
- `POST /api/contact/:id/reply` - Add reply (Protected)
- `PUT /api/contact/:id/status` - Update status (Admin only)

## Database Models

### User
- fullName, email, password (hashed)
- role (patient, doctor, admin)
- specialization (for doctors)
- phoneNumber, bio, profileImage
- timestamps

### Discussion
- title, description, category
- author (User reference)
- replies, views, likes
- status (open, closed, resolved)
- tags, timestamps

### Study
- title, description, condition
- author (User reference)
- source, publicationDate, content
- likes, shares, tags
- attachments, timestamps

### ContactRequest
- fullName, email, phoneNumber
- subject, message, requestType
- status (pending, acknowledged, moderator-assigned, doctor-assigned, resolved)
- assignedModerator, assignedDoctor (User references)
- replies array
- timestamps

### ModeratorBooking
- patient, moderator, doctor (User references)
- contactRequest reference
- topic, status, scheduledDate
- timestamps

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in request headers:

```
Authorization: Bearer <token>
```

## Email Notifications (Bonus)

Automated emails sent for:
1. Moderator booking confirmation
2. Moderator assignment notification
3. Doctor assignment notification

Configure Gmail SMTP in `.env`:
- Use an [App Password](https://support.google.com/accounts/answer/185833) for Gmail

## Error Handling

The API includes comprehensive error handling:
- Input validation errors
- MongoDB validation errors
- Duplicate key errors
- Cast errors
- Global error handler middleware

## CORS Configuration

Frontend URL is configurable via `FRONTEND_URL` in `.env`. Update for production deployment.

## Project Structure

```
backend/
├── config/
│   ├── database.js      # MongoDB connection
│   └── env.js           # Environment configuration
├── controllers/         # Request handlers
├── models/             # MongoDB schemas
├── routes/             # API endpoints
├── middleware/         # Auth, error handling
├── utils/              # Helper functions (email service)
├── server.js           # Main server file
├── package.json
├── .env.example
└── README.md
```

## Deployment

To deploy on production:
1. Set `NODE_ENV=production`
2. Update `MONGODB_URI` to production database
3. Configure real Gmail credentials or production email service
4. Update `FRONTEND_URL` to production frontend domain
5. Use a process manager like PM2

```bash
npm install -g pm2
pm2 start server.js --name "dr-online-backend"
```

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running locally or Atlas URI is correct
- **Email Not Sending**: Verify Gmail App Password and SMTP settings
- **CORS Errors**: Check `FRONTEND_URL` matches your frontend domain
- **JWT Errors**: Ensure `JWT_SECRET` is set and consistent

## License
MIT
