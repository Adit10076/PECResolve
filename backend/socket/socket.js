const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express(); // Express app
const server = http.createServer(app); // HTTP server to integrate with Express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend origin
    methods: ["GET", "POST"],
  },
});

// Define rooms
const rooms = {
  general: { instructorId: "instructor1", students: [] },
  urgent: { instructorId: "instructor2", students: [] },
  hostel: { instructorId: "instructor3", students: [] },
  campus: { instructorId: "instructor4", students: [] },
};

module.exports = { app, server , io};