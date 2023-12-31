const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const logger = require('../logger')

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workouts = await Workout.find({user_id}).sort({createdAt: -1})
  logger.info('Get request for all workouts');
  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.error('Get request for workout by id failed');
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    logger.error('Get request for workout by id failed');
    return res.status(404).json({error: 'No such workout'})
  }
  logger.info('Get request for workout by id successful');
  
  res.status(200).json(workout)
}


// create new workout
const createWorkout = async (req, res) => {
  const {title, status, description} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  // if(!status) {
  //   emptyFields.push('status')
  // }
  if(!description) {
    emptyFields.push('description')
  }
  if(emptyFields.length > 0) {
    logger.error('Please fill in all the fields');
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({title, status, description, user_id})
    logger.info('ADd workout to db success');
    res.status(200).json(workout)
  } catch (error) {
    logger.error('ADd workout to db failed');
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.error('No such workout');
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    logger.error('No such workout');
    return res.status(400).json({error: 'No such workout'})
  }
  logger.info('Deleted workout');
  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.error('Update workout failed');
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    logger.error('Update workout failed');
    return res.status(400).json({error: 'No such workout'})
  }
  logger.info('Update workout success');
  res.status(200).json(workout)
}


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}