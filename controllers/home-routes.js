const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Renders homepage
router.get('/', async (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
});

// Gets all posts with user data
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
try {
  const dbPostData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['id','username'],
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

// Return all posts associated with the user
router.get('/dashboard', withAuth, async (req, res) => {
    // Add a new route here that returns all posts associated with user, you can easily extract this via 'req.session.user_id'
    // Return all users active posts in the data base
    try { 
      const dbUserData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
    });
  
    const user = dbUserData.get({ plain: true });
  
    res.render('dashboard', {
      ...user,
      loggedIn: true
    });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Renders the login page 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login')
});

// Fetches movie data
router.get('/search/:keyword', (req, res) => {
    console.log(req.params.keyword)
    // fetch call to moviedb
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJlZmYwZTI1NTNiZjgyNGIzNjMwMTRlYjYwZDc1YyIsInN1YiI6IjY0NzAwYzg3YzVhZGE1MDExODY1OGJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DorhjgjmQMkauLuOKD7jDBaBTWjggVaLRPbf98p3rus'
        }
    };

    fetch('https://api.themoviedb.org/3/search/movie?query=' + req.params.keyword + '&include_adult=false&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            // console.log(response.results)

            const simpleData = response.results.map(item => {
                return {
                    id: item.id,
                    title: item.original_title,
                    description: item.overview,
                    photo: "https://image.tmdb.org/t/p/w500" + item.poster_path
                }
            })
            console.log(simpleData)

            res.render("search", {
                message: "Hello!",
                data: simpleData,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => console.error(err));
});

router.get("/movie/:id", (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJlZmYwZTI1NTNiZjgyNGIzNjMwMTRlYjYwZDc1YyIsInN1YiI6IjY0NzAwYzg3YzVhZGE1MDExODY1OGJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DorhjgjmQMkauLuOKD7jDBaBTWjggVaLRPbf98p3rus'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/' + req.params.id + '&include_adult=false&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {

            const simpleData = {
                id: response.id,
                title: response.original_title,
                description: response.overview,
                photo: "https://image.tmdb.org/t/p/w500" + response.poster_path
            }

            console.log(simpleData)


            res.render("selected-movie", {
                // message: "Hello!",
                data: simpleData,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => console.error(err));
})

module.exports = router;