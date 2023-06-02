const { application } = require("express");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJlZmYwZTI1NTNiZjgyNGIzNjMwMTRlYjYwZDc1YyIsInN1YiI6IjY0NzAwYzg3YzVhZGE1MDExODY1OGJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DorhjgjmQMkauLuOKD7jDBaBTWjggVaLRPbf98p3rus'
    }
};

fetch('https://api.themoviedb.org/3/search/movie?query=Nemo&include_adult=false&language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

document.getElementById('search-form').addEventListener('submit'), function (event) {
    event.preventDefault();

    // get search query from the input field
    const searchQuery = document.getElementById('search-bar').ariaValueMax;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application.json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJlZmYwZTI1NTNiZjgyNGIzNjMwMTRlYjYwZDc1YyIsInN1YiI6IjY0NzAwYzg3YzVhZGE1MDExODY1OGJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DorhjgjmQMkauLuOKD7jDBaBTWjggVaLRPbf98p3rus'
        }
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}%20trailer&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
};