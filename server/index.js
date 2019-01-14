require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { json } = require('body-parser');
const massive = require('massive');
const app = express();

const PORT = process.env.SERVER_PORT || 3001;

// middlewares
const auth = require('./middleware/authMiddleware');

// controllers
const authController = require('./controllers/auth/authController');

app.use(json());

// init session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));

// connect to database
massive(process.env.CONNECTION_STRING)
.then(db => {
    app.set('db', db);
    console.log('Database connected');
})
.catch(err => console.log('Failed to connect to database...', err));

// auth end points
app.post('/auth/register', auth.isLoggedOut, authController.register);

// open the connecton
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));