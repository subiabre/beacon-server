"use strict";

const Song = require('./model/song');
const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

router.get('/songs', async (req, res) => {
    const songs = await Song.findAll();

    res.send({songs});
});

router.get('/songs/:title', async (req, res) => {
    const songs = await Song.findAll({
        where: {
            name: {
                [Op.like]: req.params.title
            }
        }
    });

    res.send({songs});
});

router.get('/image/:id', async (req, res) => {
    const song = await Song.findAll({
        where: {
            id: req.params.id
        }
    });

    let image = Buffer.from(song[0].image, 'binary');

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(image);
});

router.get('/release/:name', async (req, res) => {
    const songs = await Song.findAll({
        where: {
            release: {
                [Op.or]: {
                    [Op.like]: req.params.name,
                    [Op.startsWith]: req.params.name,
                    [Op.eq]: req.params.name
                }
            }
        }
    });

    const data = songs[0];

    const release = {
        name: data.release,
        artist: data.artist,
        image: data.image,
        songs: songs,
    }

    res.send(release);
});

router.get('/artist/:name', async (req, res) => {
    const songs = await Song.findAll({
        where: {
            artist: {
                [Op.or]: {
                    [Op.like]: req.params.name,
                    [Op.startsWith]: req.params.name,
                    [Op.eq]: req.params.name
                }
            }
        }
    });

    res.send({songs});
});

module.exports = router;
