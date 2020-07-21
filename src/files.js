"use strict";

const fs = require('fs');
const path = require('path');
const fileType = require('file-type');

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
        let folder = new Array();
        let files = fs.readdirSync(dir);
        
        return new Promise((resolve, reject) => {
            files.forEach(async (file, index) => {
                let target = path.normalize(dir + '/' + file);
                let status = await fs.statSync(target);
        
                // Recursion on sub-folders
                if (status.isDirectory()) {
                    let subFolder = await walkFolder(target);
                    folder = folder.concat(subFolder);
                }

                // Only push files
                if (status.isFile()) {
                    folder.push(target);
                }

                // Resolve promise at end of loop
                if (index + 1 == files.length) {
                    resolve(folder);
                }
            });
        });
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
