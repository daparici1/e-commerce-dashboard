const express = require("express"); // imports express library
const app = express(); // creating instance of express app

// defines a route to handle get requests at the root ("/") URL
app.get("/", (req, resp) => {
    resp.send("app is working...")
});

app.listen(5000); // localhost 5000