//function in js:block of code
// Syntax
// function frame(){
// }fname();
function add(num1, num2){
    console.log(num1+num2);
    return num1+num2;
}
add(2,3);
//arrow function: it is a new way to write function in js
// Syntax
// const fname = (arg1,arg2) => {}
    const add=()=>{
        console.log("arrow function")
    }
    add();
    const add=(num1,num2)=>{
        return num1+num2;
    }
    console.log(add(2,3));
    //arguments array like object 
    function addNum(){
        console.log(arguments);

    }
    addNum(2,3,4,5,6);
    //nodejs is a runtime environment for executing js code outside the browser