const form = document.getElementById("requestForm");

const requestId = document.getElementById("requestId");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const requestsList = document.getElementById("requestsList");

const totalRequests = document.getElementById("totalRequests");
const highPriority = document.getElementById("highPriority");
const requestCount = document.getElementById("requestCount");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


// ============================
// LOAD ALL REQUESTS
// ============================

async function loadRequests() {

    try {

        const response = await fetch("/api/requests");

        const requests = await response.json();

        displayRequests(requests);

        updateStats(requests);

    } catch (error) {

        console.error(error);

        showToast("Unable to load requests.");

    }

}


// ============================
// DISPLAY REQUESTS
// ============================

function displayRequests(requests) {

    requestsList.innerHTML = "";


    if (requests.length === 0) {

        requestsList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    📋
                </div>

                <h3>No requests yet</h3>

                <p>
                    Your submitted campus requests will appear here.
                </p>

            </div>
        `;

        return;

    }


    requests.forEach(request => {

        const card = document.createElement("div");

        card.className = "request-card";


        const priorityClass =
            request.priority.toLowerCase();


        card.innerHTML = `

            <div class="request-card-header">

                <div>

                    <h3>
                        ${escapeHtml(request.name)}
                    </h3>

                    <p class="request-email">
                        ${escapeHtml(request.email)}
                    </p>

                </div>


                <span class="priority ${priorityClass}">
                    ${escapeHtml(request.priority)}
                </span>

            </div>


            <span class="category-label">
                ${escapeHtml(request.category)}
            </span>


            <p class="request-description">
                ${escapeHtml(request.description)}
            </p>


            <div class="card-buttons">

                <button
                    class="edit"
                    onclick="editRequest('${request.id}')"
                >
                    ✏ Edit
                </button>


                <button
                    class="delete"
                    onclick="deleteRequest('${request.id}')"
                >
                    🗑 Delete
                </button>

            </div>

        `;


        requestsList.appendChild(card);

    });

}


// ============================
// UPDATE STATISTICS
// ============================

function updateStats(requests) {

    totalRequests.textContent = requests.length;


    const highCount = requests.filter(
        request => request.priority === "High"
    ).length;


    highPriority.textContent = highCount;


    requestCount.textContent =
        `${requests.length} ${
            requests.length === 1
                ? "request"
                : "requests"
        }`;

}


// ============================
// SUBMIT / UPDATE REQUEST
// ============================

form.addEventListener("submit", async function(event) {

    event.preventDefault();


    const data = {

        name: nameInput.value.trim(),

        email: emailInput.value.trim(),

        category: categoryInput.value,

        description: descriptionInput.value.trim(),

        priority: priorityInput.value

    };


    const id = requestId.value;


    const url = id
        ? `/api/requests/${id}`
        : "/api/requests";


    const method = id
        ? "PUT"
        : "POST";


    try {

        const response = await fetch(url, {

            method: method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });


        if (!response.ok) {

            showToast("Something went wrong.");

            return;

        }


        if (id) {

            showToast("Request updated successfully.");

        } else {

            showToast("Request submitted successfully.");

        }


        resetForm();

        loadRequests();


    } catch (error) {

        console.error(error);

        showToast("Server connection failed.");

    }

});


// ============================
// EDIT REQUEST
// ============================

async function editRequest(id) {

    try {

        const response =
            await fetch(`/api/requests/${id}`);


        if (!response.ok) {

            showToast("Request not found.");

            return;

        }


        const request =
            await response.json();


        requestId.value = request.id;

        nameInput.value = request.name;

        emailInput.value = request.email;

        categoryInput.value = request.category;

        descriptionInput.value = request.description;

        priorityInput.value = request.priority;


        submitBtn.innerHTML =
            `<span>Update Request</span>
             <span class="arrow">→</span>`;


        cancelBtn.classList.remove("hidden");


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    } catch (error) {

        showToast("Unable to edit request.");

    }

}


// ============================
// DELETE REQUEST
// ============================

async function deleteRequest(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this request?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(`/api/requests/${id}`, {

                method: "DELETE"

            });


        if (response.ok) {

            showToast("Request deleted.");

            loadRequests();

        } else {

            showToast("Unable to delete request.");

        }

    } catch (error) {

        console.error(error);

        showToast("Server connection failed.");

    }

}


// ============================
// CANCEL EDIT
// ============================

cancelBtn.addEventListener(
    "click",
    resetForm
);


function resetForm() {

    form.reset();

    requestId.value = "";


    submitBtn.innerHTML =
        `<span>Submit Request</span>
         <span class="arrow">→</span>`;


    cancelBtn.classList.add("hidden");

}


// ============================
// TOAST MESSAGE
// ============================

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ============================
// SECURITY
// ============================

function escapeHtml(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


// ============================
// START APPLICATION
// ============================

loadRequests();