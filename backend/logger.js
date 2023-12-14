// const winston = require('winston');

// // Set up winston logger
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp({
// 		format: 'DD/MMM/YYYY:HH:mm:ss ZZ', // Customize the format here
// 	  }),
//     winston.format.json() // Use JSON format
//   ),
//   transports: [
//     new winston.transports.Console(), // Log to console for development
//     new winston.transports.File({ filename: 'app.log' }), // Log to file
//   ],
// });

// module.exports = logger;
const winston = require('winston');
// require('winston-mongodb');
// winston.add(new winston.transports.MongoDB(options));

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
    }),
  ],
});

module.exports = logger;

// logger.info('Info message');
// logger.error('Error message');
// logger.warn('Warning message');
