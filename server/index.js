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
const forumController = require('./controllers/fourm/fourmController');

// mail controller
const mailController = require('./controllers/auth/emailController');

app.use( express.static( `${__dirname}/../build` ) );

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
app.post('/auth/login', auth.isLoggedOut, authController.login);
app.get('/auth/logout', auth.isLoggedIn, authController.logout);
app.get('/auth/user', authController.getUser);
app.put('/auth/change-pass', auth.isLoggedIn, authController.changePass);
app.get('/auth/mail', authController.sendEmail);

app.get('/auth/email', mailController.sendMail);

// forum end points
app.get('/api/forum/categorys', forumController.getCategorys);
app.get('/api/forum/threads/:id', forumController.getThreads);
app.post('/api/forum/threads', auth.isLoggedIn, forumController.postThread);
app.get('/api/forum/thread/:id', forumController.getThread);
app.delete('/api/forum/thread/:id', auth.isLoggedIn, forumController.deleteThread);
app.post('/api/forum/thread/reply', auth.isLoggedIn, forumController.postReply);

// open the connecton
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));