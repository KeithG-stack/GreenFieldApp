// this is how the user will create an account if not they have one already
const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission
  console.log('Form submitted'); // Log to the console for debugging

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // For debugging
  console.log('Name:', name);
  console.log('Email:', email);
  
  // Basic validation (optional)
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return; // Exit the function if passwords don't match
  }

  // Send data to server using fetch
  fetch('/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(response => response.json())
  .then(data => {
    // Handle successful registration on the client-side
    if (data.success) {
      console.log('Registration successful');
      alert('Registration successful!');
      // Redirect to the homepage using window.location.href
      window.location.href = '/'; // Replace with your actual homepage route
    } else {
      alert('Registration failed: ' + data.message); // Display error message
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred during registration.');
  });
});
const cors = require('loginejs/config');
app.use(cors());
