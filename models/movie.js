const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {}

Movie.init(
{
 id: {
       type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
     },
 title: {
    type: DataTypes.STRING,
    allowNull: false,
},
description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [1],
    }
},
post_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'post',
        key: 'id',
}, 
},
user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'user',
        key: 'id',
    },
},
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
}
),
module.exports =  Movie;