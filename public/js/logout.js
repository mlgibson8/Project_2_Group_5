const logoutBtn = document.getElementById('logout');
// Function to handle the logout
async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  });
// If the response is ok, redirect to the homepage
  if (response.ok) {
    document.location.replace('/');
  } else
  // If the response is not ok, alert the user
   {
    alert(response.statusText);
  }
}

logoutBtn.addEventListener('click', logout);
