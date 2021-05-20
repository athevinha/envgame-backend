const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./model");
const { games } = require("./model");
const game = db.games;
app.use(cors(corsOptions));
app.use(express.json());

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect database");
  })
  .catch((e) => {
    console.log(e);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.get("/api/create", async (req, res) => {
  let gamea = new game({
    title: "egweg",
    description: "qweg",
    url: "QE",
    publish: true,
  });
  try {
    await gamea.save();
    res.send("hahah");
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/games/read", async (req, res) => {
  games.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
app.get("/api", (req, res) => {});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
