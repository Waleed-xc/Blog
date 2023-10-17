require("dotenv").config();
const mongoose = require("mongoose");
module.exports = () => {
const connection = mongoose
.connect(process.env.MONGODB_URI)
.then((y) => {console.log(`Connected to Mongo! Database name: "${y.connections[0].name}"`)})
.catch((err) => console.log("could not connect to database"));
};