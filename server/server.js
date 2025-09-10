const express = require('express');
const app = express();

// initialize CORS
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173', // replace with your frontend URL
    // optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from API!' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});