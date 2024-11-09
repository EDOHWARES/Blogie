// Imports
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/User');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
dotenv.config();

// Declarations
const port = 4000;
const app = express();

// Middlewares
app.use(cors({credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());

// Database connection function
connectDB();

// Endpoints
app.use('/api/user', userRouter);
app.get('/', (req, res) => {
    res.json('api working...');
});

// Initialize server
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});

//laoBqlD54EV5yzCx
//mongodb+srv://blogie:laoBqlD54EV5yzCx@cluster0.vvevk.mongodb.net/blogie