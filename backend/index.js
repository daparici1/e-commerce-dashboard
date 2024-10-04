const express = require("express"); // imports express library
require("./database/config");
const User = require("./database/User");
const app = express(); // creating instance of express app

app.use(express.json());

// api for registration
// reference notion to understand how all of this works
app.post("/register", async (req, resp) => {
  let user = new User(req.body); // whatever we are getting from postman, we can store in our user database
  let result = await user.save();
  resp.send(result);
});

app.listen(5000); // localhost 5000
