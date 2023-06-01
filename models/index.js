const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
// create associations
// sets up the foreign key relationship between the user and post tables with the foreign key constraint
User.hasMany(Post, {
  foreignKey: 'user_id',
});
// sets up the reverse relationship of the user to the post table
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});
// sets up the relationship between the comment and user tables with the foreign key constraint
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});
// sets up the relationship between the comment and post tables
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});
// sets up the relationship between the user and comment tables
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});
// sets up the relationship between the post and comment tables with the foreign key constraint
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };