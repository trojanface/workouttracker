const router = require("express").Router();
const WorkoutDB = require("../models/workout.js");
let path = require("path");

router.post("/api/workouts", ({ body }, res) => {
    WorkoutDB.create(body).then(dbTrans => {
        res.json(dbTrans);
    }).catch( err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body }, res) => {
    console.log(body);
    WorkoutDB.insertMany(body).then(dbTrans => {
        res.json(dbTrans);
    }).catch(err => {
        res.status(400).json(err);
    });
});


router.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;