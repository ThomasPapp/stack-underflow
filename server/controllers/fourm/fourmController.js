async function getCategorys(req, res) {
    const db = req.app.get('db');
    try {
        const results = await db.get_categorys();
        res.status(200).json(results);
    } catch (e) {
        console.log("Error while fetching categorys", e);
        res.sendStatus(500);
    }
}

async function getThreads(req, res) {
    const db = req.app.get('db');
    const id = req.params.id;
    try {
        const nameResults = await db.get_forum_name([ id ]);

        if (!nameResults[0]) {
            console.log("Error while fetching forum name");
            return res.sendStatus(500);
        }

        const results = await db.get_threads([ id ]);

        const data = {
            forumName: nameResults[0].forum_name,
            threads: results
        }

        res.status(200).json(data);
    } catch (e) {
        console.log('Error while fetching threads', e);
        res.sendStatus(500);
    } 
}

async function getThread(req, res) {
    const db = req.app.get('db');
    const id = req.params.id;
    try {
        // the main thread post
        const results = await db.get_thread([ id ]);
        // the thread replies
        const replies = await db.get_posts([ id ]);

        // add the replies to the thread results
        results[0].replies = replies;

        res.status(200).json(results);
    } catch (e) {
        console.log(`Error while fetching thread with id of ${id}`, e);
        res.sendStatus(500);
    }
}

async function postThread(req, res) {
    const db = req.app.get('db');
    const { title, user_id, topic, formattedDate, content } = req.body;
    try {
        const results = await db.post_thread([ title.trim(), user_id, topic, formattedDate, content ]);
        res.status(201).json(results);
    } catch (e) {
        console.log("Error while posting thread", e);
    }
}

async function deleteThread(req, res) {
    const db = req.app.get('db');
    const id = req.params.id;
    try {
        await db.remove_thread([ id ]);
        res.sendStatus(204);
    } catch (e) {
        console.log(`Error while deleting thread with id of ${id}`, e);
    }
}

async function likeThread(req, res) {
    const db = req.app.get('db');
    const { user_id, thread_id } = req.body;
    try {
        // db.
    } catch (e) {
        console.log("Error while liking thread", e);
    }
}

async function postReply(req, res) {
    const db = req.app.get('db');
    const { user_id, formattedDate, thread, content } = req.body;
    try {
        const results = await db.post_reply([ user_id, formattedDate, thread, content ]);
        const reply = await db.get_reply([ results[0].post_id ]);
        res.status(201).json(reply);
    } catch (e) {
        console.log("Error while posting reply", e);
    }
}

async function repAuthor(req, res) {
    const db = req.app.get('db');
    const { id } = req.body;
    try {
        const results = await db.get_rep([ id ]);
        if (!results[0]) {
            return res.sendStatus(500);
        }

        // the rep of the author
        const authorRep = results[0].reputation;

        // the users rep
        const userRep = 20;//req.session.user.reputation;

        // the authors new rep
        const newRep = authorRep + Math.max(1, userRep / 10);

        const repResults = await db.add_rep([ newRep, id ]);

        console.log("rep", repResults);

        res.status(200).json(repResults[0]);
    } catch (e) {
        console.log("Error while repping author", e);
    }
}

module.exports = {
    getCategorys,
    getThreads,
    postThread,
    getThread,
    deleteThread,
    postReply,
    repAuthor
}