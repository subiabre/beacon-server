"use strict";

const Song = require('./model/song');
const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

router.get('/song/:id/:stream?', async (req, res) => {
    const song = await Song.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!song) {
        res.sendStatus(404);
        return;
    }

    if (req.params.stream) {
        const songStat = fs.statSync(song.file);
        const songStream = fs.createReadStream(song.file);

        res.setHeader('Content-Type', song.mime);
        res.setHeader('Content-Length', songStat.size);
        res.setHeader('Accept-Ranges', 'bytes');

        songStream.pipe(res);
        return;
    }

    res.send(song);
});

router.get('/songs/:by/:name', async (req, res) => {
    const byParam = req.params.by;
    const songs = await Song.findAll({
        where: {
            [byParam]: {
                [Op.or]: {
                    [Op.like]: req.params.name,
                    [Op.startsWith]: req.params.name,
                    [Op.eq]: req.params.name
                }
            }
        }
    });

    if (songs.length > 0) {
        res.send(songs);
        return;
    }

    res.sendStatus(404);
});

router.get('/release/:name', async (req, res) => {
    const songs = await Song.findAll({
        where: {
            release: req.params.name
        }
    });

    if (songs.length > 0) {
        let data = songs[0];
        let release = {
            name: data.release,
            artist: data.artist,
            image: '/image/' + data.id,
            songs: songs
        }

        res.send(release);
        return;
    }

    res.sendStatus(404);
});

router.get('/artist/:name', async (req, res) => {
    const songs = await Song.findAll({
        where: {
            artist: req.params.name
        }
    });

    if (songs.length > 0) {
        let data = songs[0];
        let dataReleases = [];
        
        songs.forEach((song, index) => {
            // Push to releases if release is not in array
            if (dataReleases.indexOf(song.release) < 0) {
                dataReleases.push(song.release)
            }

            // End of loop
            if (index + 1 == songs.length) {
                let artist = {
                    name: data.artist,
                    releases: dataReleases
                }
    
                res.send(artist);
                return;
            }
        });
    }

    res.sendStatus(404);
});

router.get('/image/:id', async (req, res) => {
    const song = await Song.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!song) {
        res.sendStatus(404);
        return;
    }

    let image = Buffer.from(song.image, 'binary');

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(image);
});

module.exports = router;
