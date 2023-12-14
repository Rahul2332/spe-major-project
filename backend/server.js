require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const logger = require('./logger')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// const env = process.env.NODE_ENV || 'development';

// if (env === 'test') {
//   process.env.MONGO_URI = 'mongodb://localhost:27017/testdb'; // Adjust the database name as needed
// }


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
      logger.info('Datbase connection successful');
    })
  })
  .catch((error) => {
    console.log(error)
    logger.error('Datbase connection failed');
  })

  module.exports = app;