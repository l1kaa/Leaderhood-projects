document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("log-in-box");
    const loginForm = document.getElementById("log-in-box");
    
    const admin = {
        username: "Lika",
        email: "likachxikvadze@gmail.com",
        password: "12345",
        isAdmin: true
    };
    
    let users = JSON.parse(localStorage.getItem("users")) || [admin];
    localStorage.setItem("users", JSON.stringify(users));
    
    const setLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };
    
    function Account(username, email, password) {
        return { username, email, password };
    }
    
    const handleRegister = () => {
        const username = document.getElementById("username-input").value;
        const email = document.getElementById("email-input").value;
        const password = document.getElementById("pass-input").value;
        
        for (const user of users) {
            if (user.email === email) {
                alert("Email is already registered");
                return;
            }
        }
        
        users.push(new Account(username, email, password));
        setLocalStorage("users", users);
        alert("Registered successfully");
        window.location.href = "./index.html";
    };
    
    const handleLogIn = () => {
        const email = document.getElementById("email-input").value;
        const password = document.getElementById("pass-input").value;
        
        for (const user of users) {
            if (user.email === email && user.password === password) {
                alert(`Welcome, ${user.username}!`);
                window.location.href = "./index2.html";
                return;
            }
        }
        alert("User not found");
    };
    
    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        if (document.getElementById("username-input")) {
            handleRegister();
        } else {
            handleLogIn();
        }
    });
});