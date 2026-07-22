//synchronous and asynchronous programming
//synchronous programming
// function hello(){
//     console.log("Hello World");
// }
// hello();
// console.log("This is synchronous programming");
// const hello=()=>{
//     setTimeout(()=>{
//         console.log("Hello World");
//     },2000);
// }
// hello();
// console.log("This is asynchronous programming");
//callback, promises, async/await are used for asynchronous programming
function add(n1,n2, callback){
    console.log(n1+n2);
    if(callback){
        callback();
    }
}
let a=10;
let b=20;
add(a,b,sayHi);
add(a,b,hello);
add(sayHi, hello);
function sayHi(){
    console.log("This is callback function");
}
function hello(){
    console.log(("Hello World"))
}
//create a function display(callback) that print "welcome to abes" and then callback which print "learning FSD"
function display(callback){
    console.log("welcome to abes");
    if(callback){
        callback();
    }
}
function learn(){
    console.log("learning FSd");
}
display(learn);