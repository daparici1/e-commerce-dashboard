const express = require("express"); // imports express library
const app = express(); // creating instance of express app
const mongoose = require('mongoose');
const connectDB = async () => {
    mongoose.connect("mongodb://localhost:27017/e-comm");
    const productSchema = new mongoose.Schema({});
    const product = mongoose.model("products", productSchema);
    const data = await product.find();
    console.warn(data);
};

connectDB();

app.listen(5000); // localhost 5000
