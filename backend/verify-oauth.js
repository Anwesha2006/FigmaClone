#!/usr/bin/env node

/**
 * Google OAuth Setup Verification Script
 * This script checks if your Google OAuth is properly configured
 */

require('dotenv').config();
const colors = require('colors');

console.log('\n🔍 Google OAuth Setup Verification\n');

const checks = [
  {
    name: 'GOOGLE_CLIENT_ID',
    value: process.env.GOOGLE_CLIENT_ID,
    required: true
  },
  {
    name: 'GOOGLE_CLIENT_SECRET',
    value: process.env.GOOGLE_CLIENT_SECRET,
    required: true
  },
  {
    name: 'JWT_SECRET',
    value: process.env.JWT_SECRET,
    required: true
  },
  {
    name: 'SESSION_SECRET',
    value: process.env.SESSION_SECRET,
    required: true
  },
  {
    name: 'MONGO_URI',
    value: process.env.MONGO_URI,
    required: true
  }
];

let allPassed = true;

checks.forEach(check => {
  const hasValue = !!check.value;
  const isValid = check.required ? hasValue : true;
  
  if (isValid) {
    console.log(`✅ ${check.name}: ${colors.green('Set')}`);
  } else {
    console.log(`❌ ${check.name}: ${colors.red('Missing')}`);
    allPassed = false;
  }
});

console.log('\n📋 Setup Checklist:\n');

const checklist = [
  '1. Verify GOOGLE_CLIENT_ID starts with numbers and ends with .apps.googleusercontent.com',
  '2. Verify GOOGLE_CLIENT_SECRET starts with GOCSPX-',
  '3. Check Google Cloud Console has http://localhost:5000/api/auth/google/callback in redirect URIs',
  '4. Ensure MongoDB is running on your connection string',
  '5. Verify JWT_SECRET and SESSION_SECRET are strong strings'
];

checklist.forEach(item => console.log(item));

console.log('\n🚀 To test OAuth:\n');
console.log('1. Start backend: npm start (from backend folder)');
console.log('2. Start frontend: npm run dev (from frontend folder)');
console.log('3. Go to http://localhost:3000/login');
console.log('4. Click "Continue with Google"');
console.log('5. You should be redirected to Google login');
console.log('6. After authentication, you\'ll be logged in to the dashboard\n');

if (allPassed) {
  console.log(colors.green('✅ All environment variables are set! OAuth should work.\n'));
  process.exit(0);
} else {
  console.log(colors.red('❌ Some environment variables are missing. Please check your .env file.\n'));
  process.exit(1);
}
