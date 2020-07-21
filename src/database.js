"use strict";

const { Sequelize } = require('sequelize');

/**
 * Default Sequelize + SQLite db
 */
class Database
{
    constructor()
    {
        this.db = new Sequelize('sqlite:memory', {logging: false});
    }

    connection()
    {
        return this.db;
    }
}

module.exports = new Database;
