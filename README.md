# InterviewPilot

AI-powered interview preparation that analyzes your resume, background, and target job description to create a personalized interview preparation plan.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-InterviewPilot-000000?style=for-the-badge)](https://interview-pilot-wheat.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/yassh8055/InterviewPilot)

## Overview

InterviewPilot is a full-stack MERN application designed to help candidates prepare for specific job interviews.

Instead of providing generic interview questions, the application analyzes:

- Target job description
- Candidate resume
- Candidate's self-description

It then generates a personalized interview report containing a role match score, technical questions, behavioral questions, skill gaps, and a 7-day preparation roadmap.

The application can also generate a role-targeted resume as a downloadable PDF.

---

## Features

### 🔐 Authentication

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookie-based sessions
- Protected application routes
- Logout with token blacklisting

### 📄 Resume Analysis

- Upload resume in PDF format
- Extract resume text on the backend
- Combine resume information with job requirements
- Use candidate-provided background for additional context

### 🤖 AI Interview Analysis

InterviewPilot generates a structured report containing:

- **Role Match Score**
- **Technical Interview Questions**
- **Behavioral Interview Questions**
- **Skill Gaps**
- **7-Day Preparation Roadmap**

Each generated question also includes:

- What the interviewer is assessing
- Answer guidance tailored to the candidate

### 📊 Personalized Interview Report

The report provides an interactive interface with:

- Overall role match score
- Priority skill gaps
- Technical questions
- Behavioral questions
- Preparation roadmap
- Number of questions and preparation days
- Previously generated interview reports

### 📑 AI Resume Generation

InterviewPilot can generate a job-targeted resume based on:

- Existing resume
- Candidate background
- Target job description

The generated resume is converted into an A4 PDF using Puppeteer and can be downloaded directly.

### 💾 Saved Reports

Generated interview reports are stored in MongoDB and associated with the authenticated user.

Users can return to previously generated reports from their preparation library.

---

## How It Works

```text
                    ┌─────────────────────┐
                    │    User Sign Up     │
                    │      / Login        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Interview Setup   │
                    │                     │
                    │ • Job Description   │
                    │ • Resume PDF        │
                    │ • Self Description  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Backend        │
                    │                     │
                    │ Express + Node.js   │
                    │ Resume Extraction   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Gemini AI       │
                    │                     │
                    │ Structured Analysis │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Interview Report  │
                    │                     │
                    │ • Match Score       │
                    │ • Technical Qs      │
                    │ • Behavioral Qs     │
                    │ • Skill Gaps        │
                    │ • 7-Day Roadmap     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     MongoDB         │
                    │  Saved User Reports │
                    └─────────────────────┘
