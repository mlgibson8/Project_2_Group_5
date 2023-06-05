const router = require('express').Router();
const { Post, User } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
    await Post.findAll({
        attributes: ['title', 'description'],
        include: [
            { model: User,
            attributes: ['username']}
        ]
    })
        .then((Post) => res.json(Post))
        .catch((err) => {
            res.json(err);
        })
});

// GET one post
router.get('/:id', async (req, res) => {
    await Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['title', 'description'],
        include: [
            { model: User,
            attributes: ['username']}
        ]
    })
        .then((User) => res.json(User))
        .catch((err) => {res.json(err)})
});

// Create new post
router.post('/', async (req, res) => {
    await Post.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        movie_id: req.body.movie_id
    })
    .then((Post) => res.json(Post))
    .catch((err) => res.status(500).json(err))
});

module.exports = router;