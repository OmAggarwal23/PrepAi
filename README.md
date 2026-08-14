# 🚀 PrepAI

> **Your AI-powered Interview Companion**

PrepAI is a full-stack AI application that helps job seekers prepare for interviews by analyzing their resume and the target job description. It generates personalized interview questions, identifies skill gaps, creates a preparation roadmap, and even generates an ATS-friendly resume.

---

## ✨ Features

### 📄 Resume Analysis

- Extracts text from uploaded PDF resumes.
- Understands your experience, projects, and skills.

### 💼 Job Description Matching

- Compares your resume with the target job description.
- Calculates an AI-powered match score.

### 🧠 AI Interview Questions

Generates personalized:

- Technical Interview Questions
- Behavioral Interview Questions

Each question includes:

- Interviewer's intention
- Model answer

### 📊 Skill Gap Analysis

Highlights missing skills and categorizes them by severity.

### 🗺️ Personalized Preparation Roadmap

Creates a day-wise preparation plan based on your current profile.

### 📑 ATS Resume Generator

Generates a clean, recruiter-friendly resume in PDF format.

### 🔐 Authentication

- User Registration
- Login
- JWT Authentication
- Protected Routes

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- SCSS
- Framer Motion
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## AI

- Google Gemini API

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/PrepAI.git

cd PrepAI
```

---

## Backend

```bash
cd BACKEND

npm install
```

Create a `.env`

```env
PORT=3000

MONGODB_URI=

JWT_SECRET=

GOOGLE_API_KEY=
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd FRONTEND

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📂 Project Structure

```
PrepAI
│
├── BACKEND
│   ├── src
│   ├── package.json
│   └── ...
│
├── FRONTEND
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🚀 Future Improvements

- AI Mock Interviews
- Voice-based Interview Simulation
- AI Feedback on Spoken Answers
- Company-specific Interview Sets
- Resume Version History
- Interview Performance Analytics
- Dark / Light Theme
- Export Roadmap as PDF

---

# 👨‍💻 Author

**Om Aggarwal**

GitHub: https://github.com/OmAggarwal23

LinkedIn: https://linkedin.com/in/omaggarwal236/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
