// Handle Registration
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (username && password) {
        // Store the user data in localStorage as a JSON object
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push({ username, password }); // Add user with password
        localStorage.setItem("users", JSON.stringify(users));
        alert('Registration successful! You can now login.');
        window.location.href = "login.html"; // Redirect to login page
    } else {
        alert('Please fill in both fields.');
    }
});

// Handle Login
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username && password) {
        // Check if the user exists and the password matches
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            alert('Login successful!');
            // Add user to the logged-in users list
            const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers") || "[]");
            if (!loggedInUsers.includes(username)) {
                loggedInUsers.push(username);
                localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
            }
            window.location.href = "index.html"; // Redirect to the main page
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Please fill in both fields.');
    }
});