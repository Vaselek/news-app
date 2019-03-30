const express = require('express');

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        if (req.query.news_id) {
            connection.query('SELECT * FROM `comments` WHERE `story_id` = ?', req.query.news_id, (error, result) => {
                if (error) {
                    res.status(500).send({error: error});
                }
                res.send(result);
            });
        } else {
            connection.query('SELECT * FROM `comments`', (error, result) => {
                if (error) {
                    res.status(500).send({error: error});
                }
                res.send(result);
            });
        }
    });

    router.post('/', (req, res) => {
        const comment = req.body;

        connection.query('INSERT INTO `comments` ' +
            '(`story_id`, `author`, `text`)' +
            'VALUES (?, ?, ?)',
            [comment.story_id, comment.author, comment.text],
            (error, result) => {
                if (error) {
                    res.status(500).send({error: error});
                }
                res.send({message: 'OK'})
            })
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `comments` WHERE `id` = ?', req.params.id, (error, result) => {
            if (error) {
                res.status(500).send({error: error});
            }
            res.status(200).send({message: 'OK'});
        })
    });

    return router;
}



module.exports = createRouter;