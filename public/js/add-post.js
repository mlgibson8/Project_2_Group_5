// Function to add a post to the database
async function newPostHandler(event) {
  event.preventDefault();
  // Get the post title and description from the form
  const title = document.getElementById('add-post-title').value.trim();
  const description = document.getElementById('add-post-description').value.trim();
  const movie_id = document.getElementById('post-movie-id').value.trim();
  const movie_title = document.getElementById('post-movie-title').value.trim();
  // Get the status element
  const addPostStatusEl = document.getElementById('add-post-status');
  // If the post title or description is less than 5 characters, alert the user
  if (title.length <= 4 || description.length <= 4) {
    // If any add post input value is under 4 character length, notify the user and restrict submission
    addPostStatusEl.textContent =
      'Please make valid entries for all fields (must be at least 5 characters long)';   
  } else {
    // Execute the fetch using above values and insert them into the body (to be extracted in the route i.e. req.body.post_title)
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        movie_id,
        movie_title
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // If the response is ok, simply refresh the page
    if (response.ok) {
      addPostStatusEl.textContent = 'Posted!';
         setTimeout(() => {
        document.location.replace('/dashboard');
      }, 750);
    } else {
      // If the response is not ok, alert the user
      addPostStatusEl.textContent = 'Failed to upload post. Please try again'
    }
  }
}

document
  .querySelector('#add-post-form')
  .addEventListener('submit', newPostHandler);
