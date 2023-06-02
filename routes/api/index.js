const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');


router.use('/users', userRoutes);
router.use('/comment', commentRoutes);

mondue.exports = router;