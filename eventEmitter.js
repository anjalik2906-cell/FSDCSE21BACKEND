//event.emit("greet", "CSEC 21 this is fsd class");
const Evenemitter=require("events");
class button extends EventEmitter {
    click(){
        console.log("/ncall button click event");
        this.emit("click");
    }
    mouseover(){
        console.log("/ncall button mouseover event");
        this.emit("mouseover");
    }
    const button=new button();
    button.on("click",()=>{
        console.log("button click event is called");
    });
    