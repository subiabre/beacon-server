"use strict";

const dotenv = require('dotenv');
dotenv.config();

// Express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Sequelize
const db = require('./src/database').connection();
const { Op } = require('sequelize');

const ip = require('ip');

const ConsoleString = require('./src/console-string');
const Song = require('./src/model/song');
const ConsoleColors = ConsoleString.colors;

app.get('/songs', async (req, res) => {
    const songs = await Song.findAll();

    res.send({songs});
});

app.get('/songs/:title', async (req, res) => {
    const songs = await Song.findAll({
        where: {
            name: {
                [Op.like]: req.params.title
            }
        }
    });

    res.send({songs});
});

app.get('/artist/:name', async (req, res) => {
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

const listener = http.listen(process.env.PORT || 3127, async () => {
    new ConsoleString(`beacon-server now live.\n`)
        .log();

    try {
        await db.authenticate();
        new ConsoleString(`Using local database.`)
            .tab(2)
            .color(ConsoleColors.FgMagenta)
            .log();
    } catch (error) {
        new ConsoleString(`Unable to connect to the local database: ${error}`)
            .tab(2)
            .color(ConsoleColors.FgRed)
            .log();
    }

    let netAddress = new ConsoleString(`http://${ip.address()}:${listener.address().port}`)
        .color(ConsoleColors.FgCyan)
        .string;

    let localAddress = new ConsoleString(`http://localhost:${listener.address().port}`)
        .color(ConsoleColors.FgCyan)
        .tab(6)
        .string;

    new ConsoleString(`On your machine: ${localAddress}`)
        .tab(2)
        .log();

    new ConsoleString(`On your local network: ${netAddress}`)
        .tab(2)
        .log();
});
