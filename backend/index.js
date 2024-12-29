const express = require("express");
const app = express();
require("dotenv").config();

const cors = require('cors');

// Use CORS middleware
app.use(cors({
    origin: 'https://pec-resolve-frontend.vercel.app', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (if needed)
}));
//add middleware
app.use(express.json())
//import routes
const allRoutes = require("./routes/route.js");
const dbConnect = require("./config/database");

//mount the routes
app.use('/api/v1',allRoutes);
//connect to the database
const connectDb = require("./config/database.js")
connectDb();

app.get("/",(req,res)=>{
    res.json("This is homepage")
})
