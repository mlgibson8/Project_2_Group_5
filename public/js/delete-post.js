const posts = document.querySelectorAll('.delete-post-id');
// Function to delete a post by id
async function deletePost(id) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });
// If the response is ok, refresh the page
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}
// Add the event listener to the delete button
posts.forEach((post) => {
  post.addEventListener('click', () => {
    deletePost(post.dataset.postId);
  });
});

// Add the event listener to the delete button
const deletePostBtn = document.getElementById('delete-post-btn');
deletePostBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    let commentId = btn.dataset.commentId;
    deleteComment(commentId);
  });
});

