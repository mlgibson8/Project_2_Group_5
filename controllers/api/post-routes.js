const router = require('express').Router();
const { Post, User, Movie } = require('../../models');

// Create new post
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const movie_id = req.movie.id;
    const user_id = req.user.id;
    
    await Promise.all([Movie.findByPk(movie_id)], [User.findByPk(user_id)])
    .then(([movie, user]) => {
        if(!movie || !user) {
            alert('Error adding post! Please try again');
        } else {
            return Post.create({
            title,
            description,
            user_id: req.body.user.id,
            movie_id: req.body.movie.id
            })
        }
    })
    .then((Post) => res.json(Post))
    .catch((err) => res.status(500).json(err))
});

module.exports = router;