const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./model");
const games = db.games;
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
app.post("/api/games/create", async (req, res) => {
  let gamea = new games(req.body);
  console.log(gamea);
  try {
    await gamea.save();
    res.send("Create game successfully !");
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
app.put("/api/games/update/:id", async (req, res) => {
  let id = req.params.id;
  let updateGame = req.body;
  try {
    await games.findById(id, (err, game) => {
      game.title = updateGame.newTitle == "" ? game.title : updateGame.newTitle;
      game.description =
        updateGame.newDescription == ""
          ? game.description
          : updateGame.newDescription;
      game.url = updateGame.newUrl == "" ? game.url : updateGame.newUrl;
      game.save();
      res.send(game);
    });
  } catch (err) {
    console.log(err);
  }
});
app.delete("/api/games/delete/:id", async (req, resp) => {
  let id = req.params.id;
  await games.findOneAndDelete(id, (err, res) => {
    try {
      resp.send("delete ok");
    } catch (err) {
      console.log(err);
      resp.send(err);
    }
  });
});

app.get("/api", (req, res) => {});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
