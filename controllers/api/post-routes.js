const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
  await Post.findAll({
    include: [{
      model: User,
      attributes: ['id', 'username']
    }]
  })
  .then((Post) => res.json(Post))
  .catch((err) => {
    res.json(err);
  })
});

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    const post = dbPostData.get({ plain: true });

    res.render('post', {
      ...post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!dbPostData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(dbPostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;