const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Ishratjahan1!', 
    database: 'Bookstore' 
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Sample API endpoint for user registration
app.post('/api/register', (req, res) => {
    const { username, password } = req.body; 
    console.log('Registration request received:', req.body); // Log the registration request body
    db.query('SELECT * FROM users WHERE username = ?', [username], (checkError, checkResults) => {
        if (checkError) {
            console.error('Error checking username:', checkError);
            return res.status(500).json({ message: 'Error checking username' });
        }
        if (checkResults.length > 0) {
            console.log(`Username already taken: ${username}`);
            return res.status(400).json({ message: 'Username already taken' });
        }
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {
            if (error) {
            console.error('Registration error:', error); // Log the error details
            console.log('Registration attempt with username:', username); // Log the username for debugging
                return res.status(500).json({ message: 'Error registering user', error });
            }
            res.status(201).json({ message: 'User registered successfully', user: { username } });
        });
    });
});

// Sample API endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error || results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'User logged in successfully', user: { username } });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//</create_file>
