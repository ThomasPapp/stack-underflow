const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const mail = require('../../email');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_EMAIL_PASSWORD
    }
})

function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
}

async function login(req, res) {
    const db = req.app.get('db');
    
    const { username, password } = req.body;
    try {
        const results = await db.get_user([ username.toLowerCase() ]);
        // check if the user doesn't exists
        if (!results[0]) {
            console.log("username invalid:", username)
            return res.status(400).send("Invalid username or password");
        }
        const user = results[0];

        const correctPassword = await bcrypt.compare(password, user.password);

        // password is incorrect
        if (!correctPassword) {
            console.log("password invalid")
            return res.status(400).send("Invalid username or password");
        }

        req.session.user = {
            userId: user.user_id,
            username: user.username.toUpperCase(),
            email: user.email,
            rank: user.rank,
            avatar: user.avatar,
            reputation: user.reputation
        }

        res.status(200).json(user);
    } catch (e) {
        console.log("Error while checking user login", e);
    }
}

async function register(req, res) {
    const db = req.app.get('db');
    const { username } = req.body;
    try {
        const results = await db.get_user([ username.toLowerCase() ]);
        // check if the user exists
        if (results[0]) {
            // user exists, respond accordingly
            return res.status(400).send("Username already exists");
        }
    } catch (e) {
        console.log('Error while checking if user exists!', e);
        return;
    }

    // destructer remaining properties
    const { email, password, passwordConfirm } = req.body;

    // check if the email is already registered
    try {
        const results = await db.get_user_by_email([ email ]);
        // check if the email already exists
        if (results[0]) {
            return res.status(409).send("Email address already exists");
        }
    } catch (e) {
        console.log("Error while checking if email exists!", e);
    }

    // check if the passwords match
    if (password !== passwordConfirm) {
        return res.status(400).send("Please enter matching passwords");
    }

    // hash the password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(req.body.password, 12);
    } catch (e) {
        console.log('Error while hashing password during account creation!', e);
        return;
    }

    // register the user in the database
    try {
        const results = await db.register_user([ username.toLowerCase(), email, hashedPassword ]);
        const user = results[0];

        req.session.user = {
            userId: user.user_id,
            username: user.username.toUpperCase(),
            email: user.email,
            rank: user.rank,
            avatar: user.avatar,
            reputation: user.reputation
        }
    } catch (e) {
        console.log(`Error while registering user ${username}`, e);
        return;
    }

    const auth = `123dFERT@#$gasdfgq34t`;
    const body = mail.body(username, auth);
    const options = {
        from: `Stack Underflow <${process.env.SERVER_EMAIL}>`,
        to: email,
        subject: 'Stack Underflow Verification',
        html: body
    }

    res.status(201).json(req.session.user);

    try {
        await transporter.sendMail(options);
    } catch (e) {
        console.log('Error while sending verification email', e);
        return;
    }
}

module.exports = {
    register,
    login,
    logout
}