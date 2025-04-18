'use strict';

const express = require('express');
var cors = require('cors')
const morgan = require('morgan');
const Sequelize = require('sequelize');
const { sequelize } = require('./models');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';
require('dotenv').config();
// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// Setup morgan which gives us http request logging
app.use(morgan('dev'));

// Test the database connection.
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection to the database successful!');
//   } catch (error) {
//     console.error('Error connecting to the database: ', error);
//   }
// })();

// Setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test API route works!' });
});

// Send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// Set our port
// const PORT = process.env.PORT || 5000;

// // Start listening on our port
// app.listen(PORT, () => {
//   console.log(`Express server is listening on port ${PORT}`);
// });
module.exports = app;