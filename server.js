const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const {Workout} = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/api/workouts", (req,res) => {
    db.Workout.find({})    
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
    db.Workout.findOneAndUpdate({_id:mongojs.ObjectId(req.params.id)},{ $push: { exercises: req.body } }, { new: true })
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err)
    })
});

app.get("/api/workouts/range", (req,res)=>{

});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
  