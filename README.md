# FieldForce — Construction Field Management App

A responsive React.js web application for managing construction site operations.

## Tech Stack
- React.js 18
- Tailwind CSS
- React Router v6
- Vite

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation & Running
```bash
npm install
npm run dev
```

Open your browser at `http://localhost:5173`

## Login Credentials
```
Email:    test@test.com
Password: 123456
```

## Features
- Login with mock authentication
- Project List with search & status filter
- Daily Progress Report (DPR) Form
- Photo upload with preview
- Dark mode toggle
- Fully responsive (mobile, tablet, desktop)
- Input validation with error messages

## Folder Structure
```
src/
├── components/   → Navbar, ProjectCard, ImagePreview, DarkModeToggle
├── context/      → AuthContext (global state)
├── data/         → projects.js (mock data)
├── pages/        → Login, Projects, DPRForm
└── utils/        → validation.js
```
