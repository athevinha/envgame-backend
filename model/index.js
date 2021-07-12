const dbConfig = require("../config/db.config");
const db = {};
const mongoose = require("mongoose");

db.url = dbConfig.url;
db.mongoose = mongoose;
db.games = require("./games.model");
db.users = require("./user.model");
db.feedbacks = require("./feedback.model");
module.exports = db;
