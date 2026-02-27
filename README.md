# Wellness Game Frontend

This is the frontend of the Wellness Game — an interactive web app built using **Phaser 3** and **Vite**.

It connects to a FastAPI backend with:

- OAuth2 password login
- JSON Web Token (JWT) authentication
- Secure API calls
- CRUD wellness entries

## Features

- Login screen with JWT authentication
- Wellness dashboard with real backend data
- Add wellness entries with mood and sleep hours
- Logout functionality
- Clean project structure

## Technologies

- Phaser 3 (game and UI)
- Vite (build tool)
- JavaScript (frontend logic)
- HTML/CSS for interface
- Fetch API for backend communication

## Environment Variables

Create a `.env` file in the project root based on `.env.example`:


VITE_API_BASE_URL=http://localhost:8000


Restart the dev server after updating env.

## Run Locally

1. Install packages:

```bash
npm install

Add your .env based on .env.example

Start dev server:

npm run dev

Open browser at:

http://localhost:5173



Related Repositories

Backend: https://github.com/piathapliyal/wellnessbackend