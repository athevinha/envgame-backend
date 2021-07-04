const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./model");
const games = db.games;
const users = db.users;
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
      game.iframe =
        updateGame.newIframe == "" ? game.iframe : updateGame.newIframe;
      game.save();
      res.send(game);
    });
  } catch (err) {
    console.log(err);
  }
});
app.delete("/api/games/delete/:id", async (req, res) => {
  let _id = req.params.id;
  games.findByIdAndDelete(_id, (err, txt) => {
    try {
      res.send("Xóa thành công _ID: " + _id);
    } catch (err) {
      resp.send(err);
    }
  });
});

//===============================================================================
//================================USER============================================
//===============================================================================
// let user_form = {
//   name: "Admin",
//   gmail: "Admin",
//   password: "conchuot123@",
//   description: "",
//   type: 0,
//   avatar: "String",
//   time_playgame: 2234,
//   earned_money: [0,0,0,0,0...], // money make for month
//   played_games: [], // list game played
//   interests: [], // list hobby
//   tooken: "radom",
// };
app.post("/api/users/create", async (req, res) => {
  let usera = new users(req.body);
  console.log(usera);
  try {
    await usera.save();
    res.send("Create user successfully !");
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/users/read", async (req, res) => {
  users.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
