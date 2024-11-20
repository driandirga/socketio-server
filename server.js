import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Middleware for static files
app.use(express.static('public'));

// Socket.IO connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for client messages
    socket.on('message', (data) => {
        console.log(`Message received: ${data}`);

        // Broadcast message to all connected clients
        io.emit('message', `Server: ${data}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
