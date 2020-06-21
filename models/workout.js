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
     totalDuration: {$type: Number}
},
{typeKey: "$type"});

// WorkoutSchema.pre("find", function() {
//     if (this.exercises.length != 0) {
//     // let totalDuratio = 0;
//     //     this.exercises.forEach(element => {
//     //         totalDuratio += element.duration;
//     //     });
        
//        this.totalDuration = 163;
//        console.log("hook "+this.totalDuration);
//     }
     
// })


// methods.totalDurationCalc = function(data) {
//     console.log("running");
// //     let totalDuratio = 0;
// //     this.exercises.forEach(element => {
// //         totalDuratio += element.duration;
// //     });
// //    return this.totalDuration = totalDuratio;
//   };

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;




// day: new Date().setDate(new Date().getDate()-10),
// exercises: [
//   {
//     type: "resistance",
//     name: "Bicep Curl",
//     duration: 20,
//     weight: 100,
//     reps: 10,
//     sets: 4
//   }
// ]
// },



// day: new Date().setDate(new Date().getDate()-7),
// exercises: [
//   {
//     type: "cardio",
//     name: "Running",
//     duration: 25,
//     distance: 4
//   }
// ]