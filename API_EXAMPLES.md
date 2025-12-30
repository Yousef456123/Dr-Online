# API Request Examples - Dr. Online

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Users](#users)
3. [Discussions](#discussions)
4. [Studies](#studies)
5. [Contact Requests](#contact-requests)

---

## 🔐 Authentication

### Register User

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "patient"
}
```

**Doctor Registration:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "Dr. Sarah Johnson",
  "email": "sarah@hospital.com",
  "password": "SecurePass123",
  "role": "doctor",
  "specialization": "Cardiology"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

### Login

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

### Get Current User

**Request:**
```http
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phoneNumber": "+1-555-0100",
    "bio": "Healthcare enthusiast",
    "isVerified": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 👥 Users

### Get All Users (Admin Only)

**Request:**
```http
GET /api/users
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "users": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "patient",
      "phoneNumber": "+1-555-0100"
    }
  ]
}
```

### Get User by ID

**Request:**
```http
GET /api/users/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phoneNumber": "+1-555-0100",
    "bio": "Healthcare enthusiast",
    "profileImage": "https://example.com/image.jpg"
  }
}
```

### Get All Doctors

**Request:**
```http
GET /api/users/role/doctor
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "doctors": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "fullName": "Dr. Sarah Johnson",
      "email": "sarah@hospital.com",
      "role": "doctor",
      "specialization": "Cardiology",
      "phoneNumber": "+1-555-0101"
    }
  ]
}
```

### Update User Profile

**Request:**
```http
PUT /api/users/65a1b2c3d4e5f6g7h8i9j0k1
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Doe Updated",
  "phoneNumber": "+1-555-0200",
  "bio": "Updated bio",
  "specialization": "Neurology"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "fullName": "John Doe Updated",
    "phoneNumber": "+1-555-0200",
    "bio": "Updated bio"
  }
}
```

---

## 💬 Discussions

### Get All Discussions

**Request:**
```http
GET /api/discussions?category=general&sortBy=latest
```

**Query Parameters:**
- `category`: general, research, questions, experiences
- `sortBy`: latest (default), popular, trending

**Response:**
```json
{
  "success": true,
  "count": 3,
  "discussions": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "title": "Managing Hypertension Naturally",
      "description": "Looking for natural remedies...",
      "category": "experiences",
      "author": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "fullName": "John Doe",
        "role": "patient"
      },
      "replies": [
        {
          "user": { "fullName": "Dr. Sarah Johnson" },
          "content": "Regular exercise is crucial..."
        }
      ],
      "views": 234,
      "likes": 5,
      "status": "open",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Create Discussion

**Request:**
```http
POST /api/discussions
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Best practices for diabetes management",
  "description": "I'd like to discuss effective strategies for managing type 2 diabetes. What have you found most helpful?",
  "category": "questions",
  "tags": ["diabetes", "management", "lifestyle"]
}
```

**Response:**
```json
{
  "success": true,
  "discussion": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
    "title": "Best practices for diabetes management",
    "description": "I'd like to discuss...",
    "category": "questions",
    "author": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "fullName": "John Doe"
    },
    "tags": ["diabetes", "management", "lifestyle"],
    "replies": [],
    "views": 0,
    "likes": [],
    "status": "open",
    "createdAt": "2024-01-16T14:20:00Z"
  }
}
```

### Get Single Discussion

**Request:**
```http
GET /api/discussions/65a1b2c3d4e5f6g7h8i9j0k3
```

**Response:**
```json
{
  "success": true,
  "discussion": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Managing Hypertension Naturally",
    "description": "Looking for natural remedies...",
    "author": { "fullName": "John Doe", "role": "patient" },
    "replies": [
      {
        "user": { "fullName": "Dr. Sarah Johnson", "email": "sarah@hospital.com" },
        "content": "Regular exercise and low sodium diet...",
        "createdAt": "2024-01-15T11:00:00Z"
      }
    ],
    "views": 235,
    "likes": 5,
    "status": "open"
  }
}
```

### Add Reply to Discussion

**Request:**
```http
POST /api/discussions/65a1b2c3d4e5f6g7h8i9j0k3/reply
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "This is very helpful! I've been following these recommendations and seeing great results."
}
```

**Response:**
```json
{
  "success": true,
  "discussion": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "replies": [
      {
        "user": { "fullName": "Maria Garcia" },
        "content": "This is very helpful!...",
        "createdAt": "2024-01-16T15:45:00Z"
      }
    ]
  }
}
```

### Like Discussion

**Request:**
```http
POST /api/discussions/65a1b2c3d4e5f6g7h8i9j0k3/like
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "discussion": { "_id": "65a1b2c3d4e5f6g7h8i9j0k3", "likes": 6 },
  "liked": true
}
```

### Update Discussion

**Request:**
```http
PUT /api/discussions/65a1b2c3d4e5f6g7h8i9j0k3
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "closed"
}
```

---

## 📚 Studies

### Get All Studies

**Request:**
```http
GET /api/studies?condition=Diabetes&sortBy=popular
```

**Query Parameters:**
- `condition`: Filter by medical condition
- `sortBy`: latest (default), popular

**Response:**
```json
{
  "success": true,
  "count": 2,
  "studies": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
      "title": "Novel Treatment Approach for Type 2 Diabetes",
      "description": "A comprehensive study on new treatments...",
      "condition": "Diabetes",
      "author": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "fullName": "Dr. Sarah Johnson",
        "specialization": "Cardiology"
      },
      "source": "Journal of Clinical Endocrinology",
      "publicationDate": "2024-01-10",
      "tags": ["diabetes", "treatment", "clinical-trial"],
      "likes": 45,
      "shares": 12,
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ]
}
```

### Create Study (Doctor Only)

**Request:**
```http
POST /api/studies
Authorization: Bearer <doctor_token>
Content-Type: application/json

{
  "title": "Cardiovascular Effects of New Diabetes Medication",
  "description": "A study examining the cardiovascular benefits of medication X...",
  "condition": "Diabetes",
  "source": "New England Journal of Medicine",
  "content": "Full study content here...",
  "tags": ["diabetes", "cardiovascular", "medication"]
}
```

**Response:**
```json
{
  "success": true,
  "study": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k6",
    "title": "Cardiovascular Effects of New Diabetes Medication",
    "author": { "fullName": "Dr. Sarah Johnson", "specialization": "Cardiology" },
    "likes": 0,
    "shares": 0,
    "createdAt": "2024-01-16T16:00:00Z"
  }
}
```

### Like Study

**Request:**
```http
POST /api/studies/65a1b2c3d4e5f6g7h8i9j0k5/like
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "study": { "_id": "65a1b2c3d4e5f6g7h8i9j0k5", "likes": 46 },
  "liked": true
}
```

---

## 📞 Contact Requests

### Submit Contact Request (Public)

**Request:**
```http
POST /api/contact
Content-Type: application/json

{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phoneNumber": "+1-555-1234",
  "subject": "Consultation for chronic pain",
  "message": "I've been experiencing chronic lower back pain for 6 months. Would like to consult with a specialist.",
  "requestType": "consultation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact request submitted successfully",
  "contactRequest": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "status": "pending",
    "createdAt": "2024-01-16T17:00:00Z"
  }
}
```

### Get All Contact Requests (Admin Only)

**Request:**
```http
GET /api/contact?status=pending
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status`: pending, acknowledged, moderator-assigned, doctor-assigned, resolved

**Response:**
```json
{
  "success": true,
  "count": 2,
  "contactRequests": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "phoneNumber": "+1-555-1234",
      "subject": "Consultation for chronic pain",
      "message": "I've been experiencing...",
      "requestType": "consultation",
      "status": "pending",
      "assignedModerator": null,
      "assignedDoctor": null,
      "createdAt": "2024-01-16T17:00:00Z"
    }
  ]
}
```

### Book Moderator (Admin Only)

**Request:**
```http
POST /api/contact/65a1b2c3d4e5f6g7h8i9j0k7/book-moderator
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "message": "Moderator booked successfully",
  "contactRequest": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
    "status": "moderator-assigned",
    "assignedModerator": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "fullName": "Dr. Sarah Johnson"
    }
  },
  "booking": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k8",
    "status": "booked",
    "createdAt": "2024-01-16T17:30:00Z"
  }
}
```

### Assign Doctor (Admin Only)

**Request:**
```http
POST /api/contact/65a1b2c3d4e5f6g7h8i9j0k7/assign-doctor
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "doctorId": "65a1b2c3d4e5f6g7h8i9j0k9"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Doctor assigned successfully",
  "contactRequest": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
    "status": "doctor-assigned",
    "assignedDoctor": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k9",
      "fullName": "Dr. Ahmed Hassan"
    }
  }
}
```

### Add Reply to Contact Request

**Request:**
```http
POST /api/contact/65a1b2c3d4e5f6g7h8i9j0k7/reply
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Thank you for your request. A specialist will contact you shortly."
}
```

**Response:**
```json
{
  "success": true,
  "contactRequest": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
    "replies": [
      {
        "sender": { "fullName": "Dr. Sarah Johnson" },
        "senderRole": "doctor",
        "message": "Thank you for your request...",
        "timestamp": "2024-01-16T18:00:00Z"
      }
    ]
  }
}
```

### Update Contact Status (Admin Only)

**Request:**
```http
PUT /api/contact/65a1b2c3d4e5f6g7h8i9j0k7/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "resolved"
}
```

**Response:**
```json
{
  "success": true,
  "contactRequest": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
    "status": "resolved"
  }
}
```

---

## 🔌 Using with JavaScript/Axios

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Example usage
async function getDiscussions() {
  try {
    const response = await api.get('/discussions?category=general')
    console.log(response.data.discussions)
  } catch (error) {
    console.error('Error:', error.response.data)
  }
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'patient' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Discussion not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

**Happy API Testing! 🚀**
