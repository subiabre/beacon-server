"use strict";

const readline = require('readline').createInterface(process.stdin, process.stdout);
const fs = require('fs');
const path = require('path');
const files = require('../files');
const fileType = require('file-type');
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
    let songs = 0;

    return new Promise((resolve, reject) => {
        folder.forEach(async (file, index) => {
            const consoleProgress = new ConsoleProgressBar({
                maxValue: folder.length,
                charsLength: 50
            });

            setTimeout(async () => {
                let isSong = await addSong(file, dir);

                if (isSong) songs += 1;

                consoleProgress.addValue(index + 1);

                process.stdout.cursorTo(55);
                process.stdout.write(`${index + 1}/${folder.length} -> ${songs} songs.`);

                // Resolve at end of loop
                if (index + 1 == folder.length) {
                    resolve(folder);
                }
            }, 50 * index);
        });
    });
}

/**
 * Get the mime type of the given file
 * @param {String} file Path to file
 */
const getMime = async (file) => {
    return fileType.fromFile(file)
        .then((info) => {
            return info.mime
        })
        .catch((err) => {
            console.log(err)
        });
}

/**
 * Adds a single song file to the database
 * @param {String} file Location to file
 * @param {String} dir Directory name
 */
const addSong = async (file, dir) =>
{
    return new Promise(async (resolve, reject) => {
        let audio = await files.isAudio(file);

        if (audio) {
            let Song = require('../model/song');
            let data = await mm.parseFile(file)
                .then(async (metadata) => {
                    let mime = await getMime(file);

                    let song = {
                        name: metadata.common.title,
                        artist: metadata.common.artist,
                        release: metadata.common.album,
                        image: metadata.common.picture[0].data,
                        file: file,
                        mime: mime
                    };

                    return song;
                })
                .catch((err) => {
                    reject(err);
                });

            try {
                let song = Song.build(data);

                song.save()
                    .then(() => {
                        resolve(true);
                    })
                    .catch((err) => {
                        resolve(false);
                        //console.log(err);
                    });
            } catch (err) {
                console.log(err.message);
            }
        } else {
            resolve(false);
        }
    });
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
                folder = path.resolve(folder);

            new ConsoleString(`Updating beacon-server database with music in: '${folder}'.\n`)
                .log();

            await build(folder);

            new ConsoleString('\nLocal music updated.')
                .log();

            process.exit(0);
        }
    });
});

readline.on('close', () => {
    new ConsoleString(`\nExiting without updating.`)
        .color(ConsoleString.colors.FgRed)
        .log();
    process.exit(0);
});
