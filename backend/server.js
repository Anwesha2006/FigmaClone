require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');
const session = require("express-session");
const passport = require("./config/passport");
connectDB();
const app = express();
app.use(cors());    
app.use(express.json());
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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});