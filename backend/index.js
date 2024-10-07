const express = require("express"); // imports express library
const cors = require("cors");
require("./database/config");
const User = require("./database/User");
const Product = require("./database/Product");
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

// ADD PRODUCT API
app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

// VIEW PRODUCTS API
app.get("/products", async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No product found" });
  }
});

// DELETE PRODUCT API
app.delete("/product/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
}); // completely unsure why this comma fixes my issue

// GET PRODUCT API (USE TO UPDATE)
app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  // check ifFound
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "no product found" });
  }
});

// UPDATE PRODUCT API
app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

// SEARCH PRODUCT API
app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      {
        // $options: 'i' makes it case insensitive
        name: { $regex: req.params.key, $options: 'i' }, // regex: regular expressions - used to match sequences when you begin to search (say i wanted to search for apple i could just type a)
      },
      {
        company: { $regex: req.params.key, $options: 'i' },
      },
      {
        category: { $regex: req.params.key, $options: 'i' },
      },
    ],
  });
  resp.send(result);
});

app.listen(5000); // localhost 5000
