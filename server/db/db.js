var Sequelize = require('sequelize');
// var password = require('../config/mysqlsetup.js');
var name = process.env.CLEARDB_DATABASE_NAME;
var host = process.env.CLEARDB_DATABASE_HOST;
var password = process.env.CLEARDB_DATABASE_PASSWORD;
var username = process.env.CLEARDB_DATABASE_USERNAME;

// Using ES2015:
// import password from '../config/mysqlsetup.js';

var db = new Sequelize(name, username, password, {
  host: host,
  define: {
    timestamps: false // true by default
  }
});

module.exports = db;
