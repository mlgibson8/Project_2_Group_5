const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const movieRoutes = require('./movie-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes); 
router.use('/movies', movieRoutes);

mondule.exports = router;