# Contacts Manager

A modern, production-ready Contacts Manager web application with a beautiful, responsive React frontend and a robust Node.js + Express + SQLite backend.

## Features
- Create, Read, Update, Delete (CRUD) contacts
- Unique email, valid email format, phone length, required fields
- RESTful API with proper error handling
- Responsive, animated Material UI frontend
- Confirmation dialogs and notifications

## Tech Stack
- **Frontend:** React, Material UI, Axios
- **Backend:** Node.js, Express, SQLite

## Setup Instructions

### 1. Backend
```bash
cd backend
npm install
npm start
```
The backend runs on [http://localhost:5000](http://localhost:5000)

### 2. Frontend
```bash
cd frontend
npm install
npm start
```
The frontend runs on [http://localhost:3000](http://localhost:3000)

## Folder Structure
- `backend/` — Node.js + Express + SQLite API
- `frontend/` — React app (Material UI)

## API Endpoints
- `GET    /api/contacts` — List all contacts
- `GET    /api/contacts/:id` — Get contact by ID
- `POST   /api/contacts` — Create contact
- `PUT    /api/contacts/:id` — Update contact
- `DELETE /api/contacts/:id` — Delete contact

## Validation Rules
- **Name:** required
- **Email:** required, valid format, unique
- **Phone:** required, 10-15 digits

## License
MIT
