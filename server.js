const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample API endpoint for user registration
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    // Here you would typically save the user to the database
    res.status(201).json({ message: 'User registered successfully', user: { username } });
});

// Sample API endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Here you would typically check the user credentials against the database
    res.status(200).json({ message: 'User logged in successfully', user: { username } });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
