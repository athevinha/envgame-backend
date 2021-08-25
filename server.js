const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./model");
const games = db.games;
const users = db.users;
const feedbacks = db.feedbacks;
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
      //* title *
      game.title = updateGame.newTitle == "" ? game.title : updateGame.newTitle;
      //* description *
      game.description =
        updateGame.newDescription == ""
          ? game.description
          : updateGame.newDescription;
      //* url *
      game.url = updateGame.newUrl == "" ? game.url : updateGame.newUrl;
      //* iframe *
      game.iframe =
        updateGame.newIframe == "" ? game.iframe : updateGame.newIframe;
      //* love game *
      game.love_game =
        updateGame.newLove_game == null
          ? game.love_game
          : updateGame.newLove_game;
      //* how2play *
      game.how2play =
        updateGame.newHow2play == "" ? game.how2play : updateGame.newHow2play;
      //* Mobile game *
      game.mobile_game =
        updateGame.newNobile_game == null
          ? game.mobile_game
          : updateGame.newMobile_game;
      console.log(game);
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
app.put("/api/games/update_rank/:id", async (req, res) => {
  let id = req.params.id;
  let updateGame = req.body;
  try {
    await games.findById(id, (err, game) => {
      game.rank = updateGame.rank;
      game.save();
      res.send(game);
    });
  } catch (err) {
    console.log(err);
  }
});
//===============================================================================
//================================USER============================================
//===============================================================================
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
app.put("/api/users/update/:id", async (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;
  try {
    await users.findById(id, (err, user) => {
      user.played_games = updateUser.played_games;
      user.time_gaming = updateUser.time_gaming;
      user.save();
      res.send(user);
    });
  } catch (err) {
    console.log(err);
  }
});
// ========================== Feedback===========================
app.post("/api/feedbacks/create", async (req, res) => {
  let feedbacka = new feedbacks(req.body);
  try {
    await feedbacka.save();
    res.send(req.body);
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/feedbacks/read", async (req, res) => {
  feedbacks.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
// set port, listen for requests
var server = require("http").Server(app);
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969;
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", function (socket) {
  console.log("+1 connections !!!");
  socket.on("disconnect", function () {
    console.log(socket.id + ": disconnected");
  });
});
server.listen(port, () => console.log("Server running in port " + port));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
