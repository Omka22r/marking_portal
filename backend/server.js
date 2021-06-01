const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const users = require("./controllers/users.controller.js");

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// Database connection

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Connected to the ${db.name} database!`);
        users.setupDefaultUsers();

    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


app.get("/api", (req, res) => {
   
    res.json({ message: "Hello From Backend" });
});

require( "./routes/users.routes")(app);
require( "./routes/assignments.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});