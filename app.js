let express = require("express");
let app = express();
let PORT = process.env.PORT || 8080;
let mongoose = require("mongoose");



app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
   useNewUrlParser: true,
   useFindAndModify: false 
});

//check if db connection exists
mongoose.connection.once("open", () => {
    console.log("Database connection established");
});


app.use(require("./controllers/workout-controller.js"));


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})