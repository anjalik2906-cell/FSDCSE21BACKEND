//create your own server using HTTP module
// const http=require('http');
// const server=http.createServer((req,res)=>{

// })
// server.listen(8000,()=>{
//     console.log("server is running on port 8000")
// })
//program 3
const http = require("http");

const server = http.createServer((req, res) => {

    // Status code
    res.statusCode = 200;

    // Headers
    res.setHeader("Content-Type", "text/plain");

    // Response
    res.end("Hello World");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});



