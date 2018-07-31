const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const express = require('express');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected now');

socket.on('createMessage',(message)=>{
    console.log('createMessgae', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });


  socket.on('disconnect',()=>{
    console.log('User was disconnected');
  });




});



server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
