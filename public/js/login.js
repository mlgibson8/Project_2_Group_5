// login form handler
const loginForm = document.getElementById('login-form');
const loginStatusEl = document.getElementById('signin-status');
// Function to handle the login form submission
async function loginFormHandler(event) {
  event.preventDefault();
  // Get the email and password from the form
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-pass').value;
  // If the email and password are not empty, submit the form
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the response is ok, redirect to the dashboard
    if (response.ok) {
      document.location.replace('/');
    } else
    // If the response is not ok, alert the user
    {
      loginStatusEl.textContent = 'Email or Password is incorrect';

    }
  }
}


loginForm.addEventListener('submit', loginFormHandler);
