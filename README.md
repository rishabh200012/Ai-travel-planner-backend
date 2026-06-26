# 🌍 AI Travel Planner - Backend

Backend API for an AI-powered travel planner built using **Node.js**, **Express.js**, **MongoDB**, and **Google Gemini AI**.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cookie Parser
- Bcrypt
- Google Gemini AI
- Nodemailer

---

## Features

### 🔐 Authentication

- Register User
- Email OTP Verification
- Login
- Logout
- JWT Authentication
- HTTP Only Cookies
- Protected Routes

---

### ✈️ Trip APIs

- Create Trip
- Get All Trips
- Get Single Trip
- Update Trip
- Delete Trip

---

### 🤖 AI Integration

Google Gemini AI is used for generating:

- Personalized Itinerary
- Budget Estimation
- Hotel Recommendations
- Packing List
- Day Regeneration

---

### 📅 Itinerary APIs

- Generate Itinerary
- Regenerate Single Day
- Add Activity
- Remove Activity

---

### 🎒 Packing List

Generate destination-specific packing checklist.

---

### 💰 Budget Planner

Returns estimated:

- Hotel Cost
- Food Cost
- Transport Cost
- Activities Cost
- Total Budget

---

### 🏨 Hotel Recommendation

Returns recommended hotels with:

- Name
- Location
- Price Range
- Description

---

## Installation

```bash
npm install
```

Run Server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env`

```env
PORT=

MONGO_URI=

JWT_SECRET=

GEMINI_API_KEY=

MAIL_ADD=

MAIL_PASS=

FRONTEND_URL=
```

---

## API Routes

### Auth

```
POST /register

POST /verify-otp

POST /login

POST /logout

GET /me

POST /resend-otp
```

---

### Trips

```
POST /trip

GET /trips

GET /trip/:id

PATCH /trip/:id

DELETE /trip/:id

POST /trip/:id/generate-itinerary

PATCH /trip/:id/regenerate-day

PATCH /trip/:id/add-activity

PATCH /trip/:id/remove-activity

POST /trip/:id/generate-packing-list
```

---

## Folder Structure

```
controllers/
middleware/
models/
routes/
services/
utils/
```

---

## Future Improvements

- OAuth Login
- Image Upload
- Weather API
- Google Maps API
- Flight API
- Payment Gateway
- Share Trips
- Trip Collaboration

---

## Developed By

Rishabh Sharma
