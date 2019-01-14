const bcrypt = require('bcryptjs');

async function login(req, res) {
    
}

async function register(req, res) {
    const db = req.app.get('db');
    const { username } = req.body;
    try {
        const results = await db.get_user([ username ]);
        // check if the user exists
        if (!results.length) {
            // user doesn't exit, respond accordingly
            return res.status(409).send("Username already exists.");
        }
    } catch (e) {
        console.log('Error while checking if user exists!', e);
        return;
    }

    // destructer remaining properties
    const { email } = req.body;

    // hash the password
    const hashedPassword;
    try {
        hashedPassword = bcrypt.hash(req.body.password, 12);
    } catch (e) {
        console.log('Error while hashing password during account creation!', e);
        return;
    }

    // register the user in the database
    try {
        await db.regster_user([ username, email, hashedPassword ]);

        req.session.user = {
            username,
            email,
            rank: 0,
            reputation: 0
        }

        res.status(201).json(user);
    } catch (e) {
        console.log(`Error while register user ${username}`, e);
        return;
    }

    // TODO: Send the user a verification email
}

module.exports = {
    register
}