// Imports
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/User');

// Declarations
const port = 4000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

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