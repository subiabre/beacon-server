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
