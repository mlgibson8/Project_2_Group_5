const editPosts = document.querySelectorAll('.edit-post-id');
// Function to edit a post
async function editPost(newTitle, newBody, postId) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: newTitle,
      description: newBody,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
// If the response is ok, redirect to the dashboard
  if (response.ok) {
    document.location.replace('/dashboard');
  } else
  // If the response is not ok, alert the user
   {
    alert(response.statusText);
  }
}

// Handle the confirm button event,
const handleSubmit = (btn, postId) => {
  btn.addEventListener('click', () => {
    // Get the new title and body values
    const newTitle =
      btn.parentNode.parentNode.childNodes[1].childNodes[1].value;
    const newBody = btn.parentNode.parentNode.childNodes[3].value;
// If the title or body is less than 5 characters, alert the user
    if (newTitle.length <= 4 || newBody.length <= 4) {
      document.getElementById('edit-post-status').style.display = 'flex';
      // set timeout to hide the status after 1 second
      setTimeout(() => {
        document.getElementById('edit-post-status').style.display = 'none';
      }, 750);
    } else
    // submit the new title and body to the database
    {
      editPost(newTitle, newBody, postId);
    }
  });
};
// Add the event listener to the edit button
editPosts.forEach((post) => {
  post.addEventListener('click', () =>
   {
        const confirmBtn = document.getElementById(`confirm-post-${post.dataset.postId}`);
    confirmBtn.style.display = 'flex';

    // while editing a post, hide the delete, edit, and view comments buttons
    document.getElementById(
      `delete-post-${post.dataset.postId}`
    ).style.display = 'none';
    document.getElementById(`edit-post-${post.dataset.postId}`).style.display =
      'none';
    document.getElementById(
      `view-comments-${post.dataset.postId}`
    ).style.display = 'none';
     // edit the title
    const editTitle = document.createElement('input');
    editTitle.classList.add(`edit-title-input`);
    // Extract the postHeader title input
    const postHeader = post.parentNode.parentNode.childNodes[1].childNodes[1];
    // Set the value of the input to the current headerTitle
    editTitle.value = postHeader.innerHTML;
    // sets up the replaceChild method
    postHeader.parentNode.replaceChild(editTitle, postHeader);

   // edit the body
    const editBody = document.createElement('textarea');
    // Add the class to the textarea element
    editBody.classList.add(`edit-body-input`);
    
    const postBody = post.parentNode.parentNode.childNodes[3];
    // Set the value of the input to the current body
    editBody.value = postBody.innerHTML.trim();
    // sets up the replaceChild method
    postBody.parentNode.replaceChild(editBody, postBody);

      handleSubmit(confirmBtn, post.dataset.postId);
  });
});
