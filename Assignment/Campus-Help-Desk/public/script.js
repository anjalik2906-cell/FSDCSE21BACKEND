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

async function loadRequests() {
    const response = await fetch("/api/requests");
    const requests = await response.json();

    requestsList.innerHTML = "";

    if (requests.length === 0) {
        requestsList.innerHTML = '<p class="empty">No requests submitted yet.</p>';
        return;
    }

    requests.forEach(request => {
        const card = document.createElement("div");
        card.className = "request-card";

        card.innerHTML = `
            <h3>${escapeHtml(request.name)}</h3>
            <p><strong>Email:</strong> ${escapeHtml(request.email)}</p>
            <p><strong>Category:</strong> ${escapeHtml(request.category)}</p>
            <p><strong>Description:</strong> ${escapeHtml(request.description)}</p>
            <p><strong>Priority:</strong> <span class="badge">${escapeHtml(request.priority)}</span></p>
            <div class="card-buttons">
                <button class="edit" onclick="editRequest('${request.id}')">Edit</button>
                <button class="delete" onclick="deleteRequest('${request.id}')">Delete</button>
            </div>
        `;

        requestsList.appendChild(card);
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        category: categoryInput.value,
        description: descriptionInput.value.trim(),
        priority: priorityInput.value
    };

    const id = requestId.value;
    const url = id ? `/api/requests/${id}` : "/api/requests";
    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        alert("Something went wrong.");
        return;
    }

    resetForm();
    loadRequests();
});

async function editRequest(id) {
    const response = await fetch(`/api/requests/${id}`);
    const request = await response.json();

    requestId.value = request.id;
    nameInput.value = request.name;
    emailInput.value = request.email;
    categoryInput.value = request.category;
    descriptionInput.value = request.description;
    priorityInput.value = request.priority;

    submitBtn.textContent = "Update Request";
    cancelBtn.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteRequest(id) {
    if (!confirm("Are you sure you want to delete this request?")) {
        return;
    }

    const response = await fetch(`/api/requests/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        loadRequests();
    } else {
        alert("Could not delete the request.");
    }
}

cancelBtn.addEventListener("click", resetForm);

function resetForm() {
    form.reset();
    requestId.value = "";
    submitBtn.textContent = "Submit Request";
    cancelBtn.classList.add("hidden");
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

loadRequests();
