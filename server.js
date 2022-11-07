const express = require("express");
var http = require('http');
let app = express();
let port = 4000

app.use(express.static(__dirname + "/public/"))
app.use(express.static(__dirname + "/view/"))


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')   
})

 
var server = http.Server(app);
const io = require('socket.io')(server);
io.on("connection",(socket)=>{

    console.log(socket.id)
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message', msg)
    })
})

server.listen(port,()=>{
    console.log("server start..... ",port)
});