const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        $type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: String,
            name: String,
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
        }
    ],
    totalDuration: { $type: Number }
},
    { typeKey: "$type" });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

