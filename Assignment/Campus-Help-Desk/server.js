import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "requests.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Read requests
function readRequests() {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
}

// Write requests
function writeRequests(requests) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(requests, null, 2)
    );
}


// GET all requests
app.get("/api/requests", (req, res) => {
    const requests = readRequests();
    res.json(requests);
});


// GET request by ID
app.get("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const request = requests.find(
        r => r.id === Number(req.params.id)
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});


// POST new request
app.post("/api/requests", (req, res) => {
    const requests = readRequests();

    const newRequest = {
        id: Date.now(),
        studentName: req.body.studentName,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    requests.push(newRequest);

    writeRequests(requests);

    res.status(201).json(newRequest);
});


// PUT update request
app.put("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const index = requests.findIndex(
        r => r.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    requests[index] = {
        ...requests[index],
        studentName: req.body.studentName,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    writeRequests(requests);

    res.json(requests[index]);
});


// DELETE request
app.delete("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const filteredRequests = requests.filter(
        r => r.id !== Number(req.params.id)
    );

    if (filteredRequests.length === requests.length) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    writeRequests(filteredRequests);

    res.json({
        message: "Request deleted successfully"
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});