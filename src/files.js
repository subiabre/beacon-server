"use strict";

const fileType = require('file-type');
const getFiles = require('node-recursive-directory');

/**
 * Helper with music files and folders
 */
class Files
{
    /**
     * Get every file in a folder
     * @param {String} dir Folder with music
     */
    async walkFolder(dir)
    {
        return await getFiles(dir);
    };

    /**
     * Know if a file is an audio or not
     * @param {String} file Path to file
     */
    async isAudio(file)
    {
        return new Promise((resolve, reject) => {
            fileType.fromFile(file)
            .then((info) => {
                // Only add audio files
                if (info && info.mime.match('audio\/.*')) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
}

module.exports = new Files
