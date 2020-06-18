let express = require("express");
let app = express();
let PORT = process.env.PORT || 8080;

let db = require("./models");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//require("./controllers/workout-controller.js")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})