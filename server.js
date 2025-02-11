const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like your HTML and CSS)
app.use(express.static('public'));

// When a client connects
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from clients
    socket.on('sendMessage', (data) => {
        console.log('Received message:', data);  // Log the received message, including the imageUrl
        // Broadcast the message to all connected clients
        io.emit('receiveMessage', data);
    });

    // When a client disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set up the server to listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
