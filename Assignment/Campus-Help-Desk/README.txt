CAMPUS HELP DESK - HOW TO RUN

1. Extract the ZIP file.
2. Open the extracted Campus-Help-Desk folder in VS Code.
3. Open the terminal in that folder.
4. Run:
   npm install
5. Run:
   node server.js
6. Open in your browser:
   http://localhost:3000

The project includes:
- Student Name
- Email
- Category
- Problem Description
- Priority
- Display submitted requests
- GET /api/requests
- GET /api/requests/:id
- POST /api/requests
- PUT /api/requests/:id
- DELETE /api/requests/:id
- requests.json storage using Node.js fs
- Frontend fetch() API for GET, POST, PUT and DELETE
