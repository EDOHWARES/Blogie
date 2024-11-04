const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    res.json({requestData: {username, password}});
});

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});

//laoBqlD54EV5yzCx
//mongodb+srv://blogie:laoBqlD54EV5yzCx@cluster0.vvevk.mongodb.net/blogie