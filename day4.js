//create a promises that will display user name and password
//using receive and if data will be rejected its display error message.
// new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         let err=true;
//         if(!err){
//             resolve("user: CSE 21, password: 1234");
//         }else{
//             reject("ERROR.....:data fail")
//         }
//     },2000)

// }).then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })
//async and await
console.log("This is async and await");
async function test(){
    console.log("1");
await console.log("2");
    console.log("3");
    console.log("4");
}
test().then((res)=>{
console.log(res);
}).catch(()=>{
    
});