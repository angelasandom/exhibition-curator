Exhibition Curator Platform

🎨 PROJECT SUMMARY

Exhibition Curator is a web platform that enables users to explore and curate virtual art exhibitions by combining collections from Harvard Art Museums and Cleveland Museum of Art. Users can search through thousands of artworks, create personalized exhibition collections, and manage their curated galleries.

🔗 LIVE DEMO

https://exhibition-curator-art-gallery.netlify.app/

RENDER HOST

https://exhibition-curator-6pxh.onrender.com

FEATURES

- Search & Browse: 

Search artworks across Harvard Art Museums and Cleveland Museum of Art collections

- Filter by Type: 

Filter artworks by categories (paintings, sculptures, photographs, etc.)

- Pagination: 

Browse through results with Previous/Next navigation

- Personal Collections: 

Create and manage multiple exhibition collections

- Curate Exhibitions: 

Add or remove artworks from your personal collections

- User Authentication: 

Secure login with email/password or Google account

- Responsive Design: 

Optimized for desktop, tablet, and mobile devices

🖱 TECH STACK

- Frontend: React 18 with TypeScript

- Styling: CSS3 with responsive design

- State Management: TanStack Query (React Query)

- Authentication: Firebase Auth

- Database: MongoDB Atlas

- Backend: Node.js with Express and TypeScript

APIs:

- Harvard Art Museums API

- Cleveland Museum of Art API (Open Access)

DEPLOYMENT

- Frontend: Netlify

- Backend: Render

🖥 SETUP INSTRUCTIONS

- Prerequisites

Node.js (v16 or higher)
npm or yarn
MongoDB Atlas account
Firebase project
Harvard Art Museums API key

- Local Development

Clone the repository
bashgit clone https://github.com/angelasandom/exhibition-curator

cd exhibition-curator

- Backend Setup

bashcd backend

npm install

Create .env file in backend folder:

MONGODB_URI=your_mongodb_connection_string
PORT=5000

Add Firebase service account key:

Download from Firebase Console > Project Settings > Service Accounts

Save as backend/src/config/firebaseServiceAccountKey.json

- Frontend Setup

bashcd ../frontend

npm install

Create .env file in frontend folder:

VITE_BACKEND_URL=http://localhost:5000

VITE_HARVARD_API_KEY=your_harvard_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key

VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

VITE_FIREBASE_PROJECT_ID=your_project_id

VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket

VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

VITE_FIREBASE_APP_ID=your_app_id

- Run the application

Terminal 1 (Backend):

bashcd backend

npm run dev

Terminal 2 (Frontend):

bashcd frontend

npm run dev

Access the application

Open http://localhost:5173 in your browser

API DOCUMENTATION

Artwork Search

- Harvard Art Museums: Requires API key (free tier available)

- Cleveland Museum of Art: Open access, no API key required

BACKEND ENDPOINTS

GET /api/collections - Get user's collections

POST /api/collections - Create new collection

DELETE /api/collections/:id - Delete collection

POST /api/collections/:id/artworks - Add artwork to collection

DELETE /api/collections/:id/artworks/:artworkId - Remove artwork