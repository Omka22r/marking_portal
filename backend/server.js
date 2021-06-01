const express = require("express");
const cors = require("cors");
const app = express();


var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));



app.get("/api", (req, res) => {
   
    res.json({ message: "Hello From Backend" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});