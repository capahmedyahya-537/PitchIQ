const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/boards', require('./routes/boards'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/formations', require('./routes/formations'));
app.use('/api/drills', require('./routes/drills'));
app.use('/api/payments', require('./routes/payments'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running ✅' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Socket.io Events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join-board', (boardId) => {
    socket.join(`board-${boardId}`);
    console.log(`User joined board: ${boardId}`);
  });

  socket.on('board-update', (data) => {
    io.to(`board-${data.boardId}`).emit('board-updated', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 PitchIQ Backend running on port ${PORT}`);
});