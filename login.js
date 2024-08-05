document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupBtn = document.getElementById('signup-btn');
    const forgotPasswordLink = document.getElementById('forgot-password');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    });

    signupBtn.addEventListener('click', () => {
        const username = prompt('Enter a new username:');
        const password = prompt('Enter a new password:');
        if (username && password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! You can now login.');
        } else {
            alert('Please enter valid username and password.');
        }
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Forgot Password functionality is not implemented yet.');
    });
});
