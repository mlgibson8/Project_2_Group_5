const signupForm = document.getElementById('signup-form');
const signupStatusEl = document.getElementById('signup-status');
// Function to add a comment to the database
async function signupFormHandler(event) {
  event.preventDefault();
 // Get the signup input values, username, email, and password
  const username = document.getElementById('username-signup').value;
  const email = document.getElementById('email-signup').value;
  const password = document.getElementById('password-signup').value;
  // If any signup input value is under 5 character length, notify the user and restrict submission
  if (username.length <= 4 || email.length <= 4 || password.length <= 4) {
    // If any signup input value is under 4 character length, notify the user and restrict submission
    signupStatusEl.textContent =
      'Please use a username, email, and password with more than 4 characters';
  } else {
  // Otherwise, execute the fetch  
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
    // If the response is ok, the user receives a message
    if (response.ok) {
      signupStatusEl.textContent = 'You are now signed up!';
     } else {
      // Alerts the user of the error
      signupStatusEl.textContent = 'Signup unsuccessful. Please try again';
    }
  }
};

signupForm.addEventListener('submit', signupFormHandler);
