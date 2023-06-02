// Add the event listener to the edit button
const viewCommentBtns = document.querySelectorAll('.view-comments');
// show the comments for the post
viewCommentBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.href = `/post/${btn.dataset.postId}`;
  });
});
