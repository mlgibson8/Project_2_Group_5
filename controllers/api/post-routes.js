const router = require('express').Router();
const { Post, User, Movie } = require('../../models');

// Create new post
router.post('/', async (req, res) => {
    console.log(req.body);
    console.log(req);
    const { postTitle, postDesc, movie, user } = req.body;
    const movieId = movie.id;
    const userId = user.id;
    
    await Promise.all([Movie.findByPk(movieId)], [User.findByPk(userId)])
    .then(([movie, user]) => {
        if(!movie || !user) {
            alert('Error adding post! Please try again');
        } else {
            return Post.create({
            title,
            description,
            user_id: userId,
            movie_id: movieId
            })
        }
    })
    .then((Post) => res.json(Post))
    .catch((err) => res.status(500).json(err))
});

module.exports = router;