# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the Figma Clone application.

## Prerequisites
- Node.js and MongoDB running
- Google Cloud Console account

## Steps to Set Up Google OAuth

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click the project dropdown and select "New Project"
3. Enter a project name (e.g., "Figma Clone")
4. Click "Create"

### 2. Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### 3. Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Select "External" user type
   - Fill in the required fields (app name, user support email, etc.)
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (your email for testing)
   - Save and continue

4. After consent screen, create OAuth client ID:
   - Application type: Web application
   - Name: "Figma Clone"
   - Authorized JavaScript origins:
     - `http://localhost:5000`
     - `http://localhost:3000`
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`
   - Click "Create"

5. Copy the **Client ID** and **Client Secret**

### 4. Configure Environment Variables

1. Open `backend/.env` file
2. Add/update these variables:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here
MONGODB_URI=mongodb://localhost:27017/figma-clone
PORT=5000
```

### 5. Install Dependencies

Make sure all dependencies are installed:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 6. Run the Application

Backend:
```bash
cd backend
npm start
```

Frontend (in another terminal):
```bash
cd frontend
npm run dev
```

### 7. Test Google OAuth

1. Go to `http://localhost:3000/login`
2. Click "Continue with Google"
3. Select your test account
4. You should be redirected to the dashboard and logged in

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure `http://localhost:5000/api/auth/google/callback` is added in Google Cloud Console Credentials

### "Invalid Client ID" error
- Verify that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correctly copied from Google Cloud Console

### JWT Token not being set
- Verify `JWT_SECRET` is set in the `.env` file
- Check browser console for any errors

### MongoDB connection errors
- Ensure MongoDB is running locally on default port 27017
- Or update `MONGODB_URI` to point to your MongoDB instance

## Production Setup

For production deployment:

1. Update redirect URIs in Google Cloud Console to match your domain
2. Update `http://localhost:5000` and `http://localhost:3000` URLs in:
   - `backend/routes/auth.routes.js`
   - `frontend/app/login/page.tsx`
   - `frontend/app/sign-in/page.tsx`
   - `frontend/app/dashboard/page.tsx`
3. Use secure environment variables from your hosting provider
4. Set `NODE_ENV=production`

## How It Works

1. User clicks "Continue with Google" button
2. Frontend redirects to `http://localhost:5000/api/auth/google`
3. Passport.js handles OAuth flow with Google
4. User is redirected to Google login if not already logged in
5. After authorization, Google redirects to `/api/auth/google/callback`
6. Callback route:
   - Finds or creates user in MongoDB
   - Generates JWT token
   - Redirects to dashboard with token in URL
7. Dashboard page extracts token and user data from URL params
8. Stores token and user in localStorage
9. User is logged in and can access the application

## Security Notes

- Never commit `.env` file to version control
- Keep `JWT_SECRET` and `GOOGLE_CLIENT_SECRET` secure
- For production, use HTTPS URLs only
- Consider using environment variable services instead of .env files
