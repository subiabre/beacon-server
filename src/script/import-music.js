"use strict";

const readline = require('readline').createInterface(process.stdin, process.stdout);
const fs = require('fs');
const path = require('path');
const files = require('../files');
const mm = require('music-metadata');
const ConsoleProgressBar = require('console-progress-bar');
const ConsoleString = require('../console-string');

/**
 * Adds every song it finds in the given folder to the database
 * @param {String} dir Folder with the music directory
 */
const build = async (dir) =>
{
    let folder = await files.walkFolder(dir);

    return new Promise((resolve, reject) => {
        folder.forEach(async (file, index) => {
            const consoleProgress = new ConsoleProgressBar({
                maxValue: folder.length,
                charsLength: 50
            });

            setTimeout(async () => {
                await addSong(file, dir);

                consoleProgress.addValue(index + 1);

                process.stdout.cursorTo(55);
                process.stdout.write(`${index + 1}/${folder.length}`);

                // Resolve at end of loop
                if (index + 1 == folder.length) {
                    resolve(folder);
                }
            }, 50 * index);
        });
    });
}

/**
 * Adds a single song file to the database
 * @param {String} file Location to file
 * @param {String} dir Directory name
 */
const addSong = async (file, dir) =>
{
    let audio = await files.isAudio(file);

    if (audio) {
        let Song = require('../model/song');
        let data = await mm.parseFile(file)
            .then((metadata) => {
                let song = {
                    name: metadata.common.title,
                    artist: metadata.common.artist,
                    release: metadata.common.album,
                    file: file
                };

                return song;
            })
            .catch((err) => {
                console.log(err);
            });

        try {
            let song = Song.build(data);

            song.save()
                .then(() => {})
                .catch((err) => {
                    //console.log(err);
                });
        } catch (err) {
            console.log(err.message);
        }
    }
}

readline.setPrompt(
    new ConsoleString('Please type in the path to your music folder: ')
        .string
);
readline.prompt();

readline.on('line', async (line) => {
    fs.exists(line, async (exists) => {
        if (!exists) {
            readline.setPrompt(
                new ConsoleString(`'${line}' is not a directory. Please type a valid directory path: `)
                    .color(ConsoleString.colors.FgYellow)
                    .string
            );
            readline.prompt();
        }

        if (exists) {
            let folder = path.normalize(line);

            new ConsoleString(`Updating beacon-server database with music in: '${folder}'.\n`)
                .log();

            await build(line);

            new ConsoleString('\nLocal music updated.')
                .log();

            process.exit(1);
        }
    });
});

readline.on('close', () => {
    new ConsoleString(`\nExiting without updating.`)
        .color(ConsoleString.colors.FgRed)
        .log();
    process.exit(0);
});
