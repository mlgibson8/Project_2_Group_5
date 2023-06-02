const { Model, datatype } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {}

module.exports = {Movie};