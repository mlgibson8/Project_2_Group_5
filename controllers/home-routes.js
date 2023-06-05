const router = require('express').Router();

// Renders homepage
router.get('/', async (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
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
                data: simpleData
            })
        })
        .catch(err => console.error(err));
});

// Renders the login page 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login')
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
                data: simpleData
            })
        })
        .catch(err => console.error(err));
})

module.exports = router;