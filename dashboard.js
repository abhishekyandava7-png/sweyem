const API_URL = "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("displayUserId").innerText = userId;

    await loadBusinessProfile(userId);
});

async function loadBusinessProfile(userId) {
    try {
        const response = await fetch(`${API_URL}/business-profile/${userId}`);
        if (response.ok) {
            const profile = await response.json();
            document.getElementById("businessNameDisplay").innerText = profile.business_name;
            document.getElementById("industryDisplay").innerText = profile.industry;
            document.getElementById("goalDisplay").innerText = profile.goals;

            // If keys are present, maybe check the checkboxes automatically?
            if (profile.shopify_key) {
                document.getElementById('shopifyCheck').checked = true;
            }
            if (profile.slack_key) {
                document.getElementById('slackCheck').checked = true;
            }

        } else {
            console.error("Profile not found.");
            // If profile not found but user is logged in, maybe redirect to onboarding?
            // For now, we'll just leave it empty or show a default.
            document.getElementById("businessNameDisplay").innerText = "Business Name Not Set";
        }
    } catch (error) {
        console.error("Error loading profile:", error);
    }
}
