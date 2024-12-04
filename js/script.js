document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        carList: document.getElementById("car-list"), // Container for cars
        rpmList: document.getElementById("rpm-list"), // Container for RPMs
        tempHumidityList: document.getElementById("temp-humidity-list"), // Container for Temp/Humidity
        userList: document.getElementById("user-list"), // Container for Users
        userModal: document.getElementById("user-modal"), // Modal for user details
        modalContent: {
            username: document.getElementById("modal-username"),
            email: document.getElementById("modal-email"),
            id: document.getElementById("modal-id"),
            lastLogin: document.getElementById("modal-last-login"),
        },
        closeModalButton: document.querySelector(".close-button"),
    };

    let previousUserData = []; // Cache for user data to prevent redundant updates

    // Open modal with user details
    function openModal(user) {
        elements.modalContent.username.textContent = user.username || "N/A";
        elements.modalContent.email.textContent = user.email || "N/A";
        elements.modalContent.id.textContent = user.id || "N/A";
        elements.modalContent.lastLogin.textContent = user.lastLogin || "N/A";

        elements.userModal.classList.add("visible");
    }

    // Close modal
    function closeModal() {
        elements.userModal.classList.remove("visible");
    }

    async function fetchData() {
        try {
            const response = await fetch("fetch_data.php");
            const data = await response.json();

            console.log("API Response:", data);

            // Update Cars
            elements.carList.innerHTML = "";
            if (data.cars && Array.isArray(data.cars) && data.cars.length > 0) {
                data.cars.forEach((car) => {
                    const carElement = document.createElement("div");
                    carElement.classList.add("car-item");
                    carElement.innerHTML = `
                        <p><strong>ID:</strong> ${car.id || "N/A"}</p>
                        <p><strong>Created At:</strong> ${car.createdAt}</p>
                        <p><strong>Last Emergency:</strong> ${car.lastEmergency}</p>
                    `;
                    elements.carList.appendChild(carElement);
                });
            } else {
                elements.carList.innerHTML = "<p>No cars available</p>";
            }

            // Update RPMs
            elements.rpmList.innerHTML = "";
            if (data.rpms && Array.isArray(data.rpms) && data.rpms.length > 0) {
                data.rpms.forEach((rpm) => {
                    const rpmElement = document.createElement("div");
                    rpmElement.classList.add("rpm-item");
                    rpmElement.innerHTML = `
                        <p><strong>ID:</strong> ${rpm.id || "N/A"}</p>
                        <p><strong>RPM Value:</strong> ${rpm.value || "N/A"}</p>
                    `;
                    elements.rpmList.appendChild(rpmElement);
                });
            } else {
                elements.rpmList.innerHTML = "<p>No RPM data available</p>";
            }

            // Update Temp/Humidity
            elements.tempHumidityList.innerHTML = "";
            if (data.tempHumidities && Array.isArray(data.tempHumidities) && data.tempHumidities.length > 0) {
                data.tempHumidities.forEach((item) => {
                    const tempHumidityElement = document.createElement("div");
                    tempHumidityElement.classList.add("temp-humidity-item");
                    tempHumidityElement.innerHTML = `
                        <p><strong>ID:</strong> ${item.id || "N/A"}</p>
                        <p><strong>Temperature:</strong> ${item.temperature || "N/A"}°C</p>
                        <p><strong>Humidity:</strong> ${item.humidity || "N/A"}%</p>
                    `;
                    elements.tempHumidityList.appendChild(tempHumidityElement);
                });
            } else {
                elements.tempHumidityList.innerHTML = "<p>No temperature or humidity data available</p>";
            }

            // Update Users only if data has changed
            if (JSON.stringify(data.users) !== JSON.stringify(previousUserData)) {
                previousUserData = data.users; // Update the cache
                elements.userList.innerHTML = ""; // Clear and re-render user list

                if (data.users && Array.isArray(data.users) && data.users.length > 0) {
                    data.users.forEach((user) => {
                        const userElement = document.createElement("div");
                        userElement.classList.add("user-item");
                        userElement.textContent = user.username || "Unknown User";
                        userElement.addEventListener("click", () => openModal(user));
                        elements.userList.appendChild(userElement);
                    });
                } else {
                    elements.userList.innerHTML = "<p>No users available</p>";
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Initial fetch and periodic refresh
    fetchData();
    setInterval(fetchData, 5000);

    // Dark Mode Toggle
    document.getElementById("dark-mode-toggle").addEventListener("change", (event) => {
        document.body.classList.toggle("dark-mode", event.target.checked);
    });

    // Logout Functionality
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            window.location.href = "login.html";
        });
    }

    // Close modal when clicking outside or on the close button
    elements.closeModalButton.addEventListener("click", closeModal);
    elements.userModal.addEventListener("click", (event) => {
        if (event.target === elements.userModal) {
            closeModal();
        }
    });
});
