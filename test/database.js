"use strict";

const chai = require('chai');
const db = require('../src/database');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite:memory');

describe('Database', () => {
    it('should return a Sequelize SQLite connection', (done) => {
        let actual = db.connection();

        chai.assert.isObject(actual);
        chai.assert.deepEqual(actual.Sequelize, sequelize.Sequelize)
        done();
    });
});
