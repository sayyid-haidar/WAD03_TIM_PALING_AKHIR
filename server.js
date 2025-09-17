const express = require('express');
const path = require('path');

// Import routes
const aboutUsRoute = require('./routes/aboutUsRoute');
const greetingRoute = require('./routes/greetingRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/aboutus', aboutUsRoute);
app.use('/greeting', greetingRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the application at http://localhost:${PORT}`);
});

module.exports = app;