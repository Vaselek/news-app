const express = require('express');
const nanoid = require('nanoid');
const multer = require('multer');
const path = require('path');
const config = require('../config')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT `id`, `title`, `image`, `created_at` FROM `stories`', (error, result) => {
            if (error) {
                res.status(500).send({error: error});
            }
            res.send(result);
        });
    });

    router.post('/', upload.single('image'), (req, res) => {
        const story = req.body


        if (req.file) {
            story.image = req.file.filename;
        }

        connection.query('INSERT INTO `stories` ' +
            '(`title`, `description`, `image`)' +
            'VALUES (?, ?, ?)',
            [story.title, story.description, story.image],
            (error, result) => {
                if (error) {
                    res.status(500).send({error: error});
                }
                res.send({message: 'OK'})
            })
    });


    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `stories` WHERE `id` = ?', req.params.id, (error, result) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            if (result[0]) {
                res.send(result[0]);
            } else {
                res.status(404).send({error: 'Story not found'})
            }

        })
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `stories` WHERE `id` = ?', req.params.id, (error, result) => {
            if (error) {
                res.status(500).send({error: error});
            }
            res.status(200).send({message: 'OK'});
        })
    });

    return router;
}



module.exports = createRouter;