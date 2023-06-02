
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}
// sets the columns in the comment table, with the id column being the primary key and auto-incrementing
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
    // references the user and post tables with the foreign key constraints
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;

const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}


Comment.init(
    {
            id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
         //   primaryKey: true,
            autoIncrement: true,
    },
    text: { 
        type: DataTypes.TEXT,
        allowNull: false,
    },
   // user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
},
   // },
{
    sequelize,
    timestamp: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
},
 
);

module.exports = {Comment};
