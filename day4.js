//create a promises that will display user name and password
//using receive and if data will be rejected its display error message.
new Promise((resolve, reject)=>{
    setTimeout(()=>{
        let err=true;
        if(!err){
            resolve("user: CSE 21, password: 1234");
        }else{
            reject("ERROR.....:data fail")
        }
    },2000)

}).then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
})