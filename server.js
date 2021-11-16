const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path')

const PORT = process.env.PORT || 3000;

const db = require("./models");
const {Workout} = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/stats',(req,res) => {
    res.sendFile(path.join(__dirname,'public/stats.html'))
});

app.get('/exercise',(req,res) => {
    res.sendFile(path.join(__dirname,'public/exercise.html'))
});

app.get("/api/workouts", (req,res) => {
    db.Workout.find({})
    .populate('exercises')  
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

app.post("/api/workouts",({body},res) => {
    const exercise = new Workout(body);
    db.Workout.create(exercise)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req,res) => {
    db.Exercise.create(req.body)
    .then(dbExercise=>{
        db.Workout.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),{$push:{exercises:dbExercise}},{new:true})
        .then(dbWorkout => {
            console.log(dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        })
    })
});

app.get("/api/workouts/range", (req,res)=>{
    db.Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
  