const {comment} = require('../models');


const commentData = [
];

const seedComments = () => comment.bulkCreate(seeds);
module.exports = seedComments;