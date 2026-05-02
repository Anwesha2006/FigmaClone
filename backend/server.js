require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'SESSION_SECRET'];
const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);
if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const { setupWSConnection } = require('y-websocket/bin/utils');
const cors = require('cors');
const connectDB = require('./db/config');
const session = require("express-session");
const passport = require("./config/passport");
connectDB();
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'https://figmaclone-delta.vercel.app/'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));    
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/files', require('./routes/file.routes'));
app.use('/api/ai', require('./routes/ai.routes'));
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req, { gc: true });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});