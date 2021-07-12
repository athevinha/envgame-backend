const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  name: String,
  gmail: String,
  feedback: String,
});
const feedbacks = mongoose.model("feedback", exerciseSchema);
module.exports = feedbacks;
