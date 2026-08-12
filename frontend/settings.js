const settingsForm = document.getElementById("settingsForm");

// Load Settings
if (settingsForm) {

    fetch("https://employee-management-q9zb.onrender.com/api/settings")
        .then(response => response.json())
        .then(data => {

            if (data) {
                document.getElementById("adminName").value = data.adminName || "";
                document.getElementById("adminEmail").value = data.adminEmail || "";
                document.getElementById("adminPhone").value = data.adminPhone || "";
                document.getElementById("password").value = data.password || "";
                document.getElementById("confirmPassword").value = data.password || "";
            }

        });

    // Save Settings
    settingsForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const settings = {
            adminName: document.getElementById("adminName").value,
            adminEmail: document.getElementById("adminEmail").value,
            adminPhone: document.getElementById("adminPhone").value,
            password: password
        };

        try {

            const response = await fetch("https://employee-management-q9zb.onrender.com/api/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(settings)
            });

            const data = await response.json();

            alert(data.message);

        } catch (error) {

            console.log(error);
            alert("Error Saving Settings");

        }

    });

}