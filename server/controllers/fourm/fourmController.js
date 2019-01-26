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
        const results = await db.get_thread([ id ]);
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

module.exports = {
    getCategorys,
    getThreads,
    postThread,
    getThread,
    deleteThread
}