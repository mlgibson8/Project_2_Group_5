const router = require('express').Router();
const { Post} = require('../../models');

router.post('/', async (req, res) => {
    Post.create({
        title: req.body.post_title,
        description: req.body.post_description,
        user_id: req.session.user_id,
        movie_id: req.body.movie_id,
    })
    .then((newPost) => { res.json(newPost)
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
     });
    });

router.delete('/:id', async (req, res) => {
        Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            res.status(404).json({message: 'no post found with this id'});
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    });

router.put('/:id', async (req, res) => {
        Post.update(
            {
                title: req.body.title,
                description: req.body.description,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({message: 'no post found with this id'});
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    });

module.exports = router;