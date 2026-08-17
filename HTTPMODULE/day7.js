//create your own server using HTTP module
const http=require('http');
const server=http.createServer((req,res)=>{

})
server.listen(8000,()=>{
    console.log("server is running on port 8000")
})