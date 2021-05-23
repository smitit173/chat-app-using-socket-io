const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html'); 
});

io.on('connection', (socket) => {    
    socket.broadcast.emit('online', 'A user that you may know is now online');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
    
    socket.on('chat message', (msg) => {
        /**
         * This will emit the event to all the clients INCLUDING the sender
         */
        // io.emit('chat message', msg);
        
        /**
         * This will emit the event to all clients EXCLUDING the sender
         */
        socket.broadcast.emit('chat message', msg);
    })
});

server.listen(3000, () => {
    console.log('listening on port #3000');
})