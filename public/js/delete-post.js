const delPostHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const postStatusEl = document.getElementById('post-status');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      postStatusEl.textContent = 'Post deleted.';
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 750);
    } else {
      postStatusEl.textContent= 'Failed to delete post. Please try again';
    }
  }
};

document
  .querySelector('.user-post-list')
  .addEventListener('click', delPostHandler);