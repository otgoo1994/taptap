const express = require("express");
var cors = require('cors')
const app = express();
const fileupload = require('express-fileupload');

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}


app.use(express.json());
app.use(fileupload());
app.use(cors({
  exposedHeaders: "*"
}));
app.use(express.urlencoded({ extended: true }));
//Bring in the routes
app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));
app.use("/lesson", require("./routes/lesson"));
app.use("/text", require("./routes/text"));
app.use("/room", require("./routes/room"));
app.use("/purchase", require("./routes/purchase"));
app.use(express.static('public'))

//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;