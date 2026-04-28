require('dotenv').config();
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
app.use(cors());    
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
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