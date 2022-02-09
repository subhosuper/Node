const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter{
    constructor(){
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on("sales", (e)=>{
    console.log("There is a new sales ");
});

myEmitter.on("sales", stock => {
    console.log(`There are ${stock} items left in stock`);
});

myEmitter.emit("sales", 9);

////////////////////////////////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res)=>{
    console.log("Request received");
    console.log(req.url);
    res.end("Request received!");
});

server.on("request", (req, res) => {
    console.log("Another request");
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for response");
});
