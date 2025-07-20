const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const config = require('./config');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  path: '/backend/socket.io',
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store mapping of chatId to socket ID
const chatIdToSocketIdMap = {};

io.on('connection', (socket) => {
  const { chatId } = socket.handshake.query;
  if (chatId) {
    chatIdToSocketIdMap[chatId] = socket.id;
    console.log(`Client connected with chatId: ${chatId}, socketId: ${socket.id}`);
  }

  socket.on('disconnect', () => {
    if (chatIdToSocketIdMap[chatId] === socket.id) {
      delete chatIdToSocketIdMap[chatId];
      console.log(`Client disconnected with chatId: ${chatId}, socketId: ${socket.id}`);
    }
  });
});

// Make io and chatIdToSocketIdMap accessible to controllers
app.set('socketio', io);
app.set('chatIdToSocketIdMap', chatIdToSocketIdMap);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', chatRoutes);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
httpServer.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});