const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "requests.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readRequests() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    } catch (error) {
        return [];
    }
}

function saveRequests(requests) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2));
}

// GET all requests
app.get("/api/requests", (req, res) => {
    res.json(readRequests());
});

// GET request by ID
app.get("/api/requests/:id", (req, res) => {
    const requests = readRequests();
    const request = requests.find(r => r.id === req.params.id);

    if (!request) {
        return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
});

// POST new request
app.post("/api/requests", (req, res) => {
    const requests = readRequests();

    const newRequest = {
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    requests.push(newRequest);
    saveRequests(requests);

    res.status(201).json(newRequest);
});

// PUT/update request
app.put("/api/requests/:id", (req, res) => {
    const requests = readRequests();
    const index = requests.findIndex(r => r.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Request not found" });
    }

    requests[index] = {
        ...requests[index],
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    saveRequests(requests);
    res.json(requests[index]);
});

// DELETE request
app.delete("/api/requests/:id", (req, res) => {
    const requests = readRequests();
    const filteredRequests = requests.filter(r => r.id !== req.params.id);

    if (filteredRequests.length === requests.length) {
        return res.status(404).json({ message: "Request not found" });
    }

    saveRequests(filteredRequests);
    res.json({ message: "Request deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Campus Help Desk running at http://localhost:${PORT}`);
});
