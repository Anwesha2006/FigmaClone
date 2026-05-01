# Google OAuth Troubleshooting Guide

## Quick Verification

Run this command in the backend folder to verify your setup:
```bash
node verify-oauth.js
```

## Common Issues & Solutions

### 1. ❌ "The redirect URI does not match"

**Problem:** You see an error like `The redirect URI does not match registered URIs`

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services > Credentials
3. Find your OAuth 2.0 Client ID
4. Click Edit
5. Make sure `http://localhost:5000/api/auth/google/callback` is in "Authorized redirect URIs"
6. Click Save

---

### 2. ❌ "Client ID is invalid"

**Problem:** Browser console shows `The OAuth client ID is invalid`

**Solution:**
1. Double-check `GOOGLE_CLIENT_ID` in your `.env` file
2. It should look like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
3. Make sure there are no extra spaces or line breaks
4. Restart your backend server

---

### 3. ❌ "Server returned 400 error"

**Problem:** Login page shows error, backend logs show 400 error

**Solution:**
1. Check that `GOOGLE_CLIENT_SECRET` is correct (should start with `GOCSPX-`)
2. Verify the `.env` file in the backend folder exists
3. Restart the backend server
4. Clear browser cache and try again

---

### 4. ❌ "Redirect loop or gets stuck on 'Completing sign in...'"

**Problem:** Page shows loading spinner forever or redirects back to login

**Solution:**
1. Check browser console for errors (F12 > Console)
2. Check backend logs for errors
3. Verify `JWT_SECRET` is set in `.env`
4. Try clearing localStorage: Open DevTools > Application > localStorage > Clear All
5. Restart both backend and frontend servers

---

### 5. ❌ "localhost:3000 shows 'Page not found'"

**Problem:** Frontend isn't running or page doesn't exist

**Solution:**
```bash
cd frontend
npm install
npm run dev
```

---

### 6. ❌ "Connection refused to localhost:5000"

**Problem:** Frontend can't connect to backend

**Solution:**
```bash
# Make sure backend is running
cd backend
npm install
npm start

# Should show: "Server running on port 5000"
```

---

### 7. ✅ "Login works but localStorage is empty"

**Problem:** You get logged in but token/user data isn't saved

**Solution:**
1. Check browser's privacy/incognito mode isn't blocking localStorage
2. Open DevTools > Console and check if any errors appear
3. Try in a regular (non-incognito) window
4. Check that `/dashboard/oauth-callback` page exists

---

## Debug Checklist

Use this when troubleshooting:

- [ ] Backend is running (`npm start` in backend folder)
- [ ] Frontend is running (`npm run dev` in frontend folder)
- [ ] `.env` file exists in backend folder with all 5 variables
- [ ] `GOOGLE_CLIENT_ID` starts with numbers and ends with `.apps.googleusercontent.com`
- [ ] `GOOGLE_CLIENT_SECRET` starts with `GOCSPX-`
- [ ] Redirect URI is added in Google Cloud Console
- [ ] No extra spaces or line breaks in `.env` values
- [ ] MongoDB is running (if using local)
- [ ] Browser cache is cleared
- [ ] Both servers are restarted

---

## Advanced Debugging

### Enable Console Logging

Edit `backend/config/passport.js` and you'll see logs like:
```
✅ OAuth successful for user: name@example.com
```

### Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Click "Continue with Google"
4. Watch the requests:
   - First request to `http://localhost:5000/api/auth/google`
   - Redirects to Google login
   - After login, request to `/api/auth/google/callback`
   - Then redirect to `http://localhost:3000/dashboard/oauth-callback`

### Check Browser Storage

1. Open DevTools (F12)
2. Go to Application > localStorage
3. After successful login, you should see:
   - `token`: JWT token string
   - `user`: JSON string with user data

---

## Testing the OAuth Flow

### Manual Test Steps:

1. **Backend**: Ensure running on port 5000
   ```bash
   cd backend && npm start
   ```

2. **Frontend**: Ensure running on port 3000
   ```bash
   cd frontend && npm run dev
   ```

3. **Browser**: Go to `http://localhost:3000/login`

4. **Click**: "Continue with Google" button

5. **Expected Flow**:
   - ✅ Redirects to Google login
   - ✅ You see your Google account(s)
   - ✅ Click your account
   - ✅ See "Completing sign in..." message
   - ✅ Redirected to projects dashboard
   - ✅ Your name shows in top right

6. **If Error**: Check error message and refer to common issues above

---

## Production Deployment

When deploying to production:

1. Update URLs in these files from `localhost` to your domain:
   - `backend/routes/auth.routes.js` (callback redirects)
   - `frontend/app/login/page.tsx` (Google button link)
   - `frontend/app/sign-in/page.tsx` (Google button link)

2. Update Google Cloud Console redirect URIs to your production domain

3. Set environment variables on your hosting provider

4. Use HTTPS URLs (https:// instead of http://)

---

## Support

If you're still stuck:

1. Check backend logs: `npm start` output
2. Check frontend logs: Browser DevTools Console
3. Verify Google Cloud Console settings
4. Ensure all environment variables are set correctly
5. Restart both servers

