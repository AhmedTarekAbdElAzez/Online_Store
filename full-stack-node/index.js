const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); 

const auth = require("./routes/Auth");
const products = require("./routes/Products");
const categories = require("./routes/Categories");
const orders = require("./routes/Orders");
const users = require("./routes/Users");

app.listen(8000, "localhost", () => {
  console.log("SERVER IS RUNNING ");
});

app.use("/auth", auth);
app.use("/products", products);
app.use("/categories", categories);
app.use("/orders", orders);
app.use("/users", users);
