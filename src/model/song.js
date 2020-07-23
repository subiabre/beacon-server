"use strict";

const db = require('../database');
const { DataTypes } = require('sequelize');
const sequelize = db.connection();

const Song = sequelize.define('Song', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    artist: {
        type: DataTypes.STRING,
        allowNull: true
    },

    release: {
        type: DataTypes.STRING,
        allowNull: true
    },

    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    file: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Song.sync();

module.exports = Song;
