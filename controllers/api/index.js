const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const movieRoutes = require('./movie-routes');
const searchRoutes = require("./search-routes");
const loginRoutes = require('./login-routes.js');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/movies', movieRoutes);
router.use("/search", searchRoutes);
router.use('/login', loginRoutes);

module.exports = router;