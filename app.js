const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const jwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

const users_controller = require("./controllers/users_controller");
const recipes_controller = require("./controllers/recipes_controller");

const port = process.env.PORT || 3000;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nna3y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(jwt());

app.use("/users", users_controller);
app.use("/recipes", recipes_controller);

app.use(errorHandler);

mongoose
  .connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log("database connected!");
  })
  .catch(err => console.log(err));
const server = app.listen(port, console.log(`server started on port ${port}`));

server.on("connection", function (socket) {
  socket.setTimeout(30000000);
});
