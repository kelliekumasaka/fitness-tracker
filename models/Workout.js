const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type:Date,
    default:Date.now
  },
  exercises: [{
    type:{
        type:String,
        required:"Type of exercise is required!"
    },
    name:{
        type:String,
        required:"Please let us know which exercise you did"
    },
    duration:{
        type:Number
    },
    weight:{
        type:Number
    },
    reps:{
        type:Number
    },
    sets:{
        type:Number
    },
    distance:{
        type:Number
    }
  }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
