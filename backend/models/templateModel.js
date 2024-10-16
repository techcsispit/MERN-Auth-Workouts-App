const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutTemplateSchema = new Schema({
  title: { type: String, required: true },
  exercises: [
    {
      title: { type: String, required: true },
      load: { type: Number, required: true },
      reps: { type: Number, required: true },
    }
  ],
  user_id: { type: String, required: true }, // Link to user
}, { timestamps: true });

module.exports = mongoose.model('WorkoutTemplate', workoutTemplateSchema);
