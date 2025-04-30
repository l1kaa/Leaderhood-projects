class BankAccount {
    constructor(username, balance = 0) {
        this.username = username;
        this.balance = balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    getBalance() {
        return this.balance;
    }
}

const accounts = [];
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authForms = document.getElementById('authForms');
    const dashboard = document.getElementById('dashboard');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const dashboardUsername = document.getElementById('dashboardUsername');
    const currentBalance = document.getElementById('currentBalance');
    const depositForm = document.getElementById('depositForm');
    const withdrawForm = document.getElementById('withdrawForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const authLinks = document.querySelector('.auth-links');
    const dashboardLinks = document.querySelector('.dashboard-links');
    const usernameDisplay = document.getElementById('usernameDisplay');

    // Function to update the displayed balance
    function updateBalanceDisplay() {
        if (currentUser) {
            currentBalance.textContent = `$${currentUser.getBalance().toFixed(2)}`;
        }
    }

    // Function to show the dashboard and hide the auth forms
    function showDashboard() {
        authForms.style.display = 'none';
        dashboard.style.display = 'block';
        authLinks.style.display = 'none';
        dashboardLinks.style.display = 'flex';
        usernameDisplay.textContent = currentUser.username;
        dashboardUsername.textContent = currentUser.username;
        updateBalanceDisplay();
    }

    // Function to show the auth forms and hide the dashboard
    function showAuthForms() {
        authForms.style.display = 'block';
        dashboard.style.display = 'none';
        authLinks.style.display = 'flex';
        dashboardLinks.style.display = 'none';
        currentUser = null;
        if (loginForm) loginForm.reset();
        if (signupForm) signupForm.reset();
    }

    // Event listener for switching to the signup form
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginForm) loginForm.style.display = 'none';
            if (signupForm) signupForm.style.display = 'block';
        });
    }

    // Event listener for switching to the login form
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (signupForm) signupForm.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
        });
    }

    // Event listener for the signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = signupForm.querySelector('#signupUsername').value;
            const password = signupForm.querySelector('#signupPassword').value;

            if (username && password) {
                if (accounts.find(account => account.username === username)) {
                    alert('Username already exists. Please choose another one.');
                    return;
                }
                const newAccount = new BankAccount(username);
                accounts.push(newAccount);
                alert('Account created successfully! Please log in.');
                signupForm.reset();
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Event listener for the login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.querySelector('#loginUsername').value;
            const password = loginForm.querySelector('#loginPassword').value;

            const account = accounts.find(acc => acc.username === username);

            if (account) {
                currentUser = account;
                showDashboard();
            } else {
                alert('Invalid username or password.');
            }
            loginForm.reset();
        });
    }

    // Event listener for the deposit form submission
    if (depositForm) {
        depositForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentUser) {
                const amount = parseFloat(depositForm.querySelector('#depositAmount').value);
                if (!isNaN(amount) && currentUser.deposit(amount)) {
                    updateBalanceDisplay();
                    depositForm.reset();
                } else {
                    alert('Invalid deposit amount.');
                }
            } else {
                alert('Please log in to make a deposit.');
            }
        });
    }

    // Event listener for the withdraw form submission
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentUser) {
                const amount = parseFloat(withdrawForm.querySelector('#withdrawAmount').value);
                if (!isNaN(amount) && currentUser.withdraw(amount)) {
                    updateBalanceDisplay();
                    withdrawForm.reset();
                } else {
                    alert('Invalid withdrawal amount or insufficient balance.');
                }
            } else {
                alert('Please log in to make a withdrawal.');
            }
        });
    }

    // Event listener for the logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            showAuthForms();
        });
    }

    // Initially show the login form
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginForm) loginForm.style.display = 'block';
            if (signupForm) signupForm.style.display = 'none';
            if (authForms) authForms.style.display = 'block';
            if (dashboard) dashboard.style.display = 'none';
        });
    }

    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (signupForm) signupForm.style.display = 'block';
            if (loginForm) loginForm.style.display = 'none';
            if (authForms) authForms.style.display = 'block';
            if (dashboard) dashboard.style.display = 'none';
        });
    }

    // Show login form on initial load
    if (loginForm && authForms && dashboard) {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        authForms.style.display = 'block';
        dashboard.style.display = 'none';
    }
});