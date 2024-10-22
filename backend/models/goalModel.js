const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  exercise: { type: String, required: true },  // Name of the exercise
  targetLoad: { type: Number, required: true }, // Target weight (kg)
  targetReps: { type: Number, required: true }, // Target reps
});

module.exports = goalSchema;