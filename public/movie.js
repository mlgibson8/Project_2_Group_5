const { application } = require("express");
require('dotenv').config();

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

$(document).ready(() => {
  const performSearch = () => {
      let searchQuery = $('.search input:text').val() + ' trailer';
      const apiKey = process.env.YOUTUBE_API_KEY; // Access the API key from the environment variable
      let endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${apiKey}&q=${searchQuery}`;
    $.ajax({
      url: endpoint,
      method: 'GET',
      success: (result) => {
        const videoId = result.items[0].id.videoId;
        const videoUrl = `https://www.youtube.com/embed/${videoId}`;

        const source = $('#selected-movie-template').html();
        const template = Handlebars.compile(source);
        const context = {
          data: {

            trailerUrl: videoUrl
          },
        };
        const html = template(context);

        $('#movie-container').html(html);
      },
      error: (err, response) => {
        console.log(err.responseText);
        $('#movie-container').text(err.responseText);
      }
    });
  };

  $('button:button').click(() => {
    performSearch();
  });

  performSearch();
});
