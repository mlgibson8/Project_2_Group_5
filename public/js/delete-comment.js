
// set up the delete comment function
async function deleteComment(comment_id) {
    // Get the post id from the url
    const postId = window.location.pathname.split('/')[2];
    // Execute the fetch 
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: 'DELETE',
    });
  // if deleted, refresh the page
    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert(response.statusText);
    }
  }
  // Add the event listener to the delete button
  const deleteBtn = document.querySelectorAll('.delete-comment');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      let commentId = btn.dataset.commentId;
      deleteComment(commentId);
    });
  });
  