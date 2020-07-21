"use strict";

const chai = require('chai');
const files = require('../src/files');
const fs = require('fs');

describe('Files', () => {
    it('should get every file in a folder', async () => {
        let folder = await files.walkFolder(__dirname);
        let randomFile = folder[Math.floor(Math.random() * folder.length)];
        let randomFileExists = fs.existsSync(randomFile);

        chai.assert.isArray(folder);
        chai.assert.isTrue(randomFileExists);
    });

    it('should tell if a file is an audio or not', async () => {
        let audio = await files.isAudio(__filename);

        chai.assert.isFalse(audio);
    });
})
