const router = require("express").Router();
const WorkoutDB = require("../models/workout.js");
let path = require("path");

router.post("/api/workouts", ({ body }, res) => {//is accessed when the user accesses the create new exercise screen
    WorkoutDB.create(body).then(dbTrans => {//creates a new workout in the workout database
        res.json(dbTrans); //returns the new entry
    }).catch(err => {
        res.status(400).json(err); //catch any errors
    });
});

router.put("/api/workouts/:id", (req, res) => {//is accessed when workout information is sent to the controller
    //finds the workout referenced in the url and then pushes the exercise information into the appropriate array and adds the duration to the entry.
    WorkoutDB.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body }, $inc: { totalDuration: req.body.duration } }, function (error, success) {
        if (error) {
            res.status(400).json(err); //catch any errors
        } else {
            res.json(success); //returns the success object
        }
    });
});


router.get("/api/workouts", (req, res) => {//access the most recent exercise entry
    WorkoutDB.find({})//get all entries
        .sort({ day: 1 })//arrange them in descending order
        .then(dbtrans => {//we only access the most recent entry
            let totalDuration = 0;
            dbtrans[dbtrans.length - 1].exercises.forEach(element => {//for each exercise add the duration and set the total
                totalDuration += element.duration;
            });
            dbtrans[dbtrans.length - 1].totalDuration = totalDuration;
            res.json(dbtrans);//returns the new entry
        })
        .catch(err => {
            res.status(400).json(err); //catch any errors
        });
});


router.get("/api/workouts/range", (req, res) => {//access the range query
    WorkoutDB.find({day: {$lte: Date.now(), $gte: new Date().setDate(new Date().getDate()-7)}})//pulls exercises from the last 7 days. (NOTE: That the stats.js interprets this data and displays only the last 7 entries regardless of what day they were on...)
        .then(dbtrans => {
            res.json(dbtrans);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/stats", (req, res) => {//returns the stats page when called for
    WorkoutDB.find({})//returns all entries
        .then(dbtrans => {
            res.sendFile(path.join(__dirname, "../public/stats.html"));
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/", (req, res) => {//returns the exercise page when called for
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});


router.get("/exercise", (req, res) => {//returns the exercise page when called for
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;