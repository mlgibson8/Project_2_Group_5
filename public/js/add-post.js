const addPostForm = document.getElementById('add-post-form');
// Function to add a post to the database
async function newPostHandler(event) {
  event.preventDefault();
  // Get the post title and description from the form
  const postTitle = document.getElementById('add-post-title').value;
  const postDesc = document.getElementById('add-post-description').value;
  // Get the status element
  const addPostStatusEl = document.getElementById('add-post-status');
  // If the post title or description is less than 5 characters, alert the user
  if (postTitle.length <= 4 || postDesc.length <= 4) {
    // If any add post input value is under 4 character length, notify the user and restrict submission
    addPostStatusEl.textContent =
      'Please make valid entries for all fields (must be at least 5 characters long)';   
  } else {
    // Execute the fetch using above values and insert them into the body (to be extracted in the route i.e. req.body.post_title)
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postDesc,
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
      alert(response.statusText);
    }
  }
}

addPostForm.addEventListener('submit', newPostHandler);
