const express = require('express');
const { app, io, server } = require("./socket/socket.js");

require("dotenv").config();

const cors = require('cors');

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin 'https://pec-resolve-frontend.vercel.app'
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (if needed)
}));

// Add middleware
app.use(express.json());

const PORT = process.env.PORT;

// Import routes
const allRoutes = require("./routes/route.js");
const dbConnect = require("./config/database");

// Connect to the database
dbConnect();

// Mount the routes
app.use('/api/v1', allRoutes);

// Start the server
server.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});

// Homepage route
app.get("/", (req, res) => {
    res.json({ message: "This is homepage" });
});