let isSignUpMode = false;

document.addEventListener("DOMContentLoaded", () => {
    // Clear any previous session on login page load
    localStorage.removeItem("user_id");

    // Check if we have any users, if not, maybe seed a demo user?
    const users = JSON.parse(localStorage.getItem("abi_users") || "{}");
    if (Object.keys(users).length === 0) {
        // Seed default demo user for convenience if user wants to play immediately
        // users['user@example.com'] = 'password';
        // localStorage.setItem("abi_users", JSON.stringify(users));
    }
});

function toggleMode() {
    isSignUpMode = !isSignUpMode;
    const title = document.getElementById("formTitle");
    const subtitle = document.getElementById("formSubtitle");
    const submitBtn = document.getElementById("submitBtn");
    const toggleText = document.getElementById("toggleText");
    const toggleLink = document.getElementById("toggleLink");
    const confirmGroup = document.getElementById("confirmPassGroup");
    const errorDisplay = document.getElementById("errorDisplay");

    // Clear errors
    errorDisplay.innerText = "";

    if (isSignUpMode) {
        title.innerText = "Create Account";
        subtitle.innerText = "Join ABI for advanced business intelligence";
        submitBtn.innerText = "Sign Up";
        toggleText.innerText = "Already have an account?";
        toggleLink.innerText = "Log In";
        confirmGroup.style.display = "block";
        confirmGroup.classList.add('slide-up');
    } else {
        title.innerText = "Welcome Back";
        subtitle.innerText = "Enter your credentials to access the dashboard";
        submitBtn.innerText = "Log In";
        toggleText.innerText = "New to ABI?";
        toggleLink.innerText = "Sign Up";
        confirmGroup.style.display = "none";
    }
}

function handleAuth() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorDisplay = document.getElementById("errorDisplay");

    if (!email || !password) {
        errorDisplay.innerText = "⚠️ Please fill in all fields.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("abi_users") || "{}");

    if (isSignUpMode) {
        // SIGN UP LOGIC
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            errorDisplay.innerText = "❌ Passwords do not match.";
            return;
        }

        if (users[email]) {
            errorDisplay.innerText = "⚠️ Account already exists. Please log in.";
            return;
        }

        // Save new user
        users[email] = password;
        localStorage.setItem("abi_users", JSON.stringify(users));

        alert("✅ Account created successfully! Please log in.");
        toggleMode(); // Switch to login view
        // Auto-fill for convenience
        document.getElementById("email").value = email;

    } else {
        // LOGIN LOGIC
        if (users[email]) {
            if (users[email] === password) {
                // SUCCESS
                loginSuccess(email);
            } else {
                errorDisplay.innerText = "❌ Incorrect password.";
            }
        } else {
            errorDisplay.innerText = "❌ No account found with this email.";
        }
    }
}

function handleGoogleLogin() {
    // Simulate Google Login
    const mockEmail = "google_user_" + Math.floor(Math.random() * 1000) + "@gmail.com";
    alert(`🌐 Google Login Successful as ${mockEmail}`);
    loginSuccess(mockEmail);
}

function loginSuccess(email) {
    const errorDisplay = document.getElementById("errorDisplay");
    errorDisplay.style.color = "#10b981"; // Success Green
    errorDisplay.innerText = "✅ Login Successful! Redirecting...";

    // Save session
    const username = email.split('@')[0];
    localStorage.setItem("user_id", username);

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);
}
