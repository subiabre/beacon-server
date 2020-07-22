"use strict";

// Express
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const app = express();

// Socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Others
const ip = require('ip');
const dotenv = require('dotenv');
const db = require('./src/database').connection();
const userAgent = require('user-agent-parse');
const ConsoleString = require('./src/console-string');
const ConsoleColors = ConsoleString.colors;

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/client/build'));

app.use(routes);

let socketList = new Array();
io.on('connection', (socket) => {
    const socketMin = {
        id: socket.id,
        userAgent: userAgent.parse(socket.handshake.headers['user-agent'])
    };

    //console.log(socketList);
    socketList.push(socketMin);

    // Sync socket list on new sockets
    io.emit('socket:update', socketList);

    // Remove socket and sync socket list on disconnect
    socket.on('disconnect', () => {
        let socketIndex = socketList.indexOf(socketMin);

        socketList = socketList.splice(socketIndex + 1);

        io.emit('socket:update', socketList);
    });

    // Send play signal to certain socket
    socket.on('play:atSocket', (data) => {
        io.to(data.socketId).emit('play:song', data.song);
    });

    // Send play signal to all sockets
    socket.on('play:allSockets', (song) => {
        io.emit('play:song', song);
    });

    // Send pause signal to certain socket
    socket.on('pause:atSocket', (data) => {
        io.to(data.socketId).emit('pause:song', data.song);
    });

    // Send pause singal to all sockets
    socket.on('pause:allSockets', (song) => {
        io.emit('pause:song', song);
    });
});

// Launch server
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
