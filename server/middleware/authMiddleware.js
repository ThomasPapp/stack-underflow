function isLoggedIn(req, res, next) {
    if (!req.session.user) {
        return res.status(401).send("You must login before accessing this.");
    }

    next();
}

function isLoggedOut(req, res, next) {
    if (req.session.user) {
        return res.status(401).send("You must be logged out bfore accessing this.");
    }

    next();
}

module.exports = {
    isLoggedIn,
    isLoggedOut
}