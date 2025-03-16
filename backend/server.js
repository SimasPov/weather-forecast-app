const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});
con.connect((err) => {
    if (err) throw new Error(err);
    console.log('Connected');
    con.query('CREATE DATABASE IF NOT EXISTS my_db', (err) => {
        if (err) throw new Error(err);
        console.log("Database created/exists");
        con.changeUser({ database: 'my_db' }, (err) => {
            if (err) throw new Error(err);
            createTable();
        });
    });
})

function createTable() {
    con.query(`CREATE TABLE IF NOT EXISTS actions (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        city VARCHAR(100),
        timestamp DATE
    )`, (err) => {
        if (err) throw new Error(err);
        console.log("Table created/exists");
    })
}


// Routes
app.post('/log', (req, res) => {
    const { cityName, timestamp } = req.body;

    // Store user action to DB
    con.query('INSERT INTO actions SET ?', {
        city: cityName,
        timestamp: new Date(timestamp),
    }, (err) => {
        if (err) throw new Error(err);
        console.log("User action stored in the database");
    })
    // Log user action to console
    console.log(`[${new Date(timestamp).toLocaleString()}] City: ${cityName}`);

    res.status(200).json({ success: true });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Weather WeatherForecast API logging service started');
});