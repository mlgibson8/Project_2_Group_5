const router = require('express').Router();


//  --->  /api/search

router.get('/:keyword', (req, res) => {
    console.log(req.session)
    // fetch call to moviedb
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJlZmYwZTI1NTNiZjgyNGIzNjMwMTRlYjYwZDc1YyIsInN1YiI6IjY0NzAwYzg3YzVhZGE1MDExODY1OGJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DorhjgjmQMkauLuOKD7jDBaBTWjggVaLRPbf98p3rus'
        }
    };
    // console.log(req.session)

    fetch('https://api.themoviedb.org/3/search/movie?query=' + req.params.keyword + '&include_adult=false&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            const simpleData = response.results.map(item => {
                return {
                    id: item.id,
                    title: item.original_title,
                    description: item.overview,
                    photo: "https://image.tmdb.org/t/p/w500" + item.poster_path
                }
            })
            // console.log(simpleData)

            res.render("search", {
                message: "Hello!",
                data: simpleData,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => console.error(err));

})


module.exports = router;