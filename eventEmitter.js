//event.emit("greet", "CSEC 21 this is fsd class");
class button extends EventEmitter {
    click(){
        console.log("/ncall button click event");
        this.emit("click");
    }