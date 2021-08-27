const express = require('express');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// Set env variables in dev env
if (app.get('env') == 'development') require('dotenv').config();

const db = require('./db');

const PORT = process.env.PORT || 5000;
app.enable('trust proxy');

var apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  delayMs: 0,
  message: 'Please try again after sometime.',
});

// middleware
app.use('/api/', apiLimiter); // activate limiter for api calls only
app.use(helmet()); // header security
app.use(cors()); // cross origin resources
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '300kb' }));

// api controllers/routers
const users = require('./routes/user');

app.use('/api/user', users);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.listen(PORT, () => console.log('Server running on PORT: ' + PORT));
