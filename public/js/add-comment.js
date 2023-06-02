const addCommentForm = document.getElementById('comment-form');
// Function to add a comment to the database
async function addComment(newComment, postId) {
  const response = await fetch(`/api/comments/${postId}`, {
    method: 'POST',
    body: JSON.stringify({
      comment_text: newComment,
      post_id: postId,
    }),
    // Make sure the content type is set to JSON
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // If the response is submitted, redirect to the post page
  if (response.ok) {
    document.location.replace(`/post/${postId}`);
  } else
  // If the response is not ok, alert the user 
  {
    alert(response.statusText);
  }
}
// Function to handle the form submission
const newCommentHandler = (event) => {
  event.preventDefault();

// Get the comment text from the form
  const comment_text = document.getElementById('comment-field').value;
  const commentStatusEl = document.getElementById('comment-status');
// If the comment is less than 5 characters, alert the user
  if (comment_text.length <= 4) {
        commentStatusEl.textContent =
      'comment must be at least 5 characters long';
      } else 
      // sumbit the comment to the database
      {
        // Set the comment status to posted
    commentStatusEl.textContent = 'posted';
     const postId = window.location.pathname.split('/')[2];
    // After 1 second, add the comment to the database
    setTimeout(() => {
      addComment(comment_text, postId);
    }, 750);
  }
};

// Add the event handler for the form submission
addCommentForm.addEventListener('submit', newCommentHandler);
