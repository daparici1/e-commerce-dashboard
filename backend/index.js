const express = require("express"); // imports express library
const cors = require("cors");
require("./database/config");
const User = require("./database/User");
const app = express(); // creating instance of express app

app.use(express.json());
app.use(cors());

// SIGNUP API
// reference notion to understand how all of this works
app.post("/register", async (req, resp) => {
  let user = new User(req.body); // whatever we are getting from postman, we can store in our user database
  let result = await user.save();
  result = result.toObject();
  delete result.password; // make sure password doesnt pop up in our output
  resp.send(result);
});

// LOGIN API
app.post("/login", async (req, resp) => {
  // conditional for check if the user inputs both email and password,
  // if only the email is inserted, we do not want to return anything
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      // conditional for checking if the user exists
      resp.send(user);
    } else {
      resp.send({ result: "No user found" });
    }
  } else {
    resp.send({ result: "No user found " });
  }
  // notion page 14
});

app.listen(5000); // localhost 5000
