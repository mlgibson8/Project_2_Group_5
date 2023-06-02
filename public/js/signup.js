const signupForm = document.getElementById('signup-form');
// Function to add a comment to the database
async function signupFormHandler(event) {
  event.preventDefault();
 // Get the signup input values, username, email, and password
  const username = document.getElementById('username-signup').value;
  const email = document.getElementById('email-signup').value;
  const password = document.getElementById('password-signup').value;

  // Get the signup status element 
  const signupStatusEl = document.getElementById('signup-status');
  // If any signup input value is under 5 character length, notify the user and restrict submission
  if (username.length <= 4 || email.length <= 4 || password.length <= 4) {
    // If any signup input value is under 4 character length, notify the user and restrict submission
    signupStatusEl.textContent =
      'Please use a username, email, and password with character count above 4';
   
  } else
  // Otherwise, execute the fetch
  {
    
    const response = await fetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      // Set the content type to JSON
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the response is ok, simply refresh the page and redirect to the dashboard
    if (response.ok) {
      signupStatusEl.textContent = 'Signed up';
     } else {
      // alert the user of the error
      alert(response.statusText);
    }
  }
}


signupForm.addEventListener('submit', signupFormHandler);
