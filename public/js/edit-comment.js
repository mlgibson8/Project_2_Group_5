// function to edit a comment
async function editComment(comment_id, newComment) {
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment_text: newComment,
      }),
      // Make sure the content type is set to JSON
      headers: {
        'Content-Type': 'application/json',
      },
    });
  // If the response is ok, redirect to the post page
    if (response.ok) {
      // Get the post id from the url
      const postId = window.location.pathname.split('/')[2];
      document.location.replace(`/post/${postId}`);
    } else
    // If the response is not ok, alert the user
     {
      alert(response.statusText);
    }
  }
  
  // Function to handle the form submission
  const handleSubmit = (confirmBtn, commentId) => {
    // Add an event listener to the confirm button
    confirmBtn.addEventListener('click', () => {
      let newComment =
        confirmBtn.parentNode.parentNode.childNodes[3].childNodes[3].value;
      if 
      // If the comment is less than 5 characters, alert the user
      (newComment.length <= 4) {
        document.getElementById('new-comment-status').style.display = 'flex';
       // set timeout to hide the status after 1 second
        setTimeout(() => {
          // sets timeout to hide the status after 1 second
          document.getElementById('new-comment-status').style.display = 'none';
        }, 750);
      } else
      // submit the comment to the database
      {
        editComment(commentId, newComment);
      }
    });
  };
  // Add the event listener to the edit button
  const editBtn = document.querySelectorAll('.edit-comment');
  //
  editBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Get the comment id from the button
      let commentId = btn.dataset.commentId;
      // if the comment is being edited, hide the delete button
      document.getElementById(`delete-comment-${commentId}`).style.display =
        'none';
          btn.style.display = 'none';
  
      // Create a new textarea element
      const editComment = document.createElement('textarea');
      // Add the class to the textarea element
      editComment.classList.add(`edit-comment-input`);
      // shows the current comment
      const currentComment = btn.parentNode.parentNode.childNodes[3].children[1];
      // pusts the current comment into the textarea element
      editComment.value = currentComment.innerHTML;
      // Then replace the current comment element with this textarea element
      currentComment.parentNode.replaceChild(editComment, currentComment);
  // shows the confirm button 
      const confirmBtn = document.getElementById(`confirm-comment-${commentId}`);
      confirmBtn.style.display = 'flex';
  
      handleSubmit(confirmBtn, commentId);
    });
  });