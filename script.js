document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check the username and password (example: both should be "admin")
    if (username === 'test' && password === '@1344') {
        window.open('crud.html', '_blank'); // Open a new page in a new browser tab
    } else {
        alert('Invalid username or password');
    }
});