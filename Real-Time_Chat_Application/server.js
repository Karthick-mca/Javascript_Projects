const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder (This serves all files in 'public')
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', (socket) => {
    console.log('New WebSocket connection...');

    // Welcome current user
    socket.emit('message', 'Welcome to the Chat Room!');

    // Broadcast when a user connects (except the user)
    socket.broadcast.emit('message', 'A user has joined the chat.');

    // Listen for chatMessage from client
    socket.on('chatMessage', (message) => {
        io.emit('message', message); // Broadcast message to everyone
    });

    // Runs when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat.');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
