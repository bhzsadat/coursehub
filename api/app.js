'use strict';

const express = require('express');
var cors = require('cors')
const morgan = require('morgan');
const Sequelize = require('sequelize');
const { sequelize } = require('./models');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// Create the Express app
const app = express();

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:5173', // Local development
        'https://coursehub-xpiq.onrender.com', // Render API
        /^https:\/\/coursehub-.*\.vercel\.app$/, // Vercel preview URLs
        'https://coursehub.vercel.app' // Production Vercel URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Increase payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware
app.use(cors(corsOptions));
app.use('/api', routes);

// Setup morgan which gives us http request logging
app.use(morgan('dev'));

// Test the database connection.
(async () => {
  try {
    console.log('Attempting to connect to the database...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Database URL exists:', !!process.env.POSTGRES_URL);
    
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
    
    // Sync database
    console.log('Syncing database...');
    await sequelize.sync();
    console.log('Database sync completed!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
})();

// Setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
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

  // Handle timeout errors
  if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT') {
    return res.status(504).json({
      message: 'Request timeout. Please try again.',
      error: err.message
    });
  }

  // Handle database errors
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      message: 'Database error occurred',
      error: err.message
    });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Set our port
app.set('port', process.env.PORT || 5000);

// Increase timeout
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

// Set server timeout
server.timeout = 120000; // 2 minutes
