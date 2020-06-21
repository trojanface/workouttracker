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
    console.log(body);//Needs to find the appropriate workout (using id) then add the body to the excersises of the workout


    WorkoutDB.find({}).sort({day: "descending"}).limit(1).then(result => {
         console.log(result[0]._id);
         WorkoutDB.findOneAndUpdate({_id: result[0]._id}, {$push:{exercises:body}, $inc: {totalDuration: body.duration}}, function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }});

          // WorkoutDB.insert(body).then(dbTrans => {//need to change this from insert to an update
    //     res.json(dbTrans);
    // }).catch(err => {
    //     res.status(400).json(err);
    // });
    });
});

// router.get("/:id", (req,res) => {
//     WorkoutDB.find({_id: req.params.id}).then(dbtrans => {
//         res.json(dbtrans);
//     })
//     .catch(err => {
//         res.status(400).json(err);
//     });
// });

router.get("/api/workouts", (req,res) => {
    WorkoutDB.find({})
    .sort({ date: -1 })
    .then(dbtrans => {
        let totalDuration = 0;
        dbtrans[dbtrans.length-1].exercises.forEach(element => {
            totalDuration += element.duration;
        });
        dbtrans[dbtrans.length-1].totalDuration = totalDuration;
        console.log(dbtrans[dbtrans.length-1]);
        res.json(dbtrans);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req,res) => {
    WorkoutDB.find({})
    .then(dbtrans => {
        res.json(dbtrans);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/stats", (req,res) => {
    WorkoutDB.find({})
    .then(dbtrans => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


router.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;