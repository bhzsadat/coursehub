// api/courses.js

const express = require('express');
const app = express();

// Define any routes you need for courses
app.get('/', (req, res) => {
  res.send('Courses endpoint');
});

// Export the express app (Vercel expects this)
module.exports = app;
