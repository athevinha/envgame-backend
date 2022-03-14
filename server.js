const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./model");
const check_is_leaf = require("./check_is_leaf_api");
const cloudinary = require("cloudinary").v2;
const games = db.games;
const users = db.users;
const feedbacks = db.feedbacks;
const chats = db.chats;
const got = require("got");
cloudinary.config({
  cloud_name: "envgame",
  api_key: "336187849671285",
  api_secret: "w6UXeVVwn0-uYH3zA-YH0q4NYiY",
  secure: true,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));

var corsOptions = {
  origin: "http://localhost:8081",
};

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
app.post("/api/envgame/games/create", async (req, res) => {
  let gamea = new games(req.body);
  try {
    await gamea.save();
    res.send("Create game successfully !");
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/envgame/games/read", async (req, res) => {
  games.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
app.put("/api/envgame/games/update/:id", async (req, res) => {
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
app.delete("/api/envgame/games/delete/:id", async (req, res) => {
  let _id = req.params.id;
  games.findByIdAndDelete(_id, (err, txt) => {
    try {
      res.send("Xóa thành công _ID: " + _id);
    } catch (err) {
      resp.send(err);
    }
  });
});
app.put("/api/envgame/games/update_rank/:id", async (req, res) => {
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
//==============================================================================
//================================USER============================================
//===============================================================================
app.post("/api/envgame/users/create", async (req, res) => {
  let usera = new users(req.body);
  console.log(usera);
  try {
    await usera.save();
    res.send("Create user successfully !");
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/envgame/users/read", async (req, res) => {
  users.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
app.put("/api/envgame/users/update/:id", async (req, res) => {
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
app.post("/api/envgame/feedbacks/create", async (req, res) => {
  let feedbacka = new feedbacks(req.body);
  try {
    await feedbacka.save();
    res.send(req.body);
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/envgame/feedbacks/read", async (req, res) => {
  feedbacks.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
// ========================== Chat===========================
app.get("/api/envgame/chats/read", async (req, res) => {
  chats.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
app.post("/api/envgame/chats/create", async (req, res) => {
  let chata = new chats(req.body);
  try {
    await chata.save();
    res.send(req.body);
  } catch (e) {
    console.log(e);
  }
});
const apiKey = "acc_a94e63861293515";
const apiSecret = "616653c74f9bdf3d2c6595aea6c3dffa";
app.post("/api/envgame/ai/detect", async (req, res) => {
  const url =
    "http://api.imagga.com/v2/tags?image_url=" +
    encodeURIComponent(req.body.url);
  try {
    const response = await got(url, {
      username: apiKey,
      password: apiSecret,
    });
    const AI_IN4 = {
      detection: response.body,
      mode: "imagga",
    };
    res.send(AI_IN4);
  } catch (error) {
    console.error(error);
  }
});
app.post("/upload", (req, res) => {
  let base64 = req.body.base64;
  cloudinary.uploader.upload(base64, function (error, result) {
    console.log(result, error);
    res.send({ result, error });
  });
  //   res.send("vdf");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// io.on("connection", function (socket) {
//   console.log("+1 connections !!!");
//   socket.on("disconnect", function () {
//     console.log(socket.id + ": disconnected");
//   });
//   socket.on("send message", (data) => {
//     io.emit("send message", { data });
//   });
//   socket.on("AI detect", (img) => {
//     //check mode here
//     if (img.mode == "" || img.mode == "imagga" || img.mode == null)
//       check_is_leaf.detection_imagga(img.url, io);
//     else check_is_leaf.detetion_vision(img.url, io);
//   });
// });
