const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./model");
// const check_is_leaf = require("./check_is_leaf_api");
const games = db.games;
const users = db.users;
const feedbacks = db.feedbacks;
const chats = db.chats;

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
app.post("/api/envgame/conchuot2945@/2945/games/create", async (req, res) => {
  let gamea = new games(req.body);
  try {
    await gamea.save();
    res.send("Create game successfully !");
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/envgame/conchuot2945@/2945/games/read", async (req, res) => {
  games.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
app.put(
  "/api/envgame/conchuot2945@/2945/games/update/:id",
  async (req, res) => {
    let id = req.params.id;
    let updateGame = req.body;
    try {
      await games.findById(id, (err, game) => {
        //* title *
        game.title =
          updateGame.newTitle == "" ? game.title : updateGame.newTitle;
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
  }
);
app.delete(
  "/api/envgame/conchuot2945@/2945/games/delete/:id",
  async (req, res) => {
    let _id = req.params.id;
    games.findByIdAndDelete(_id, (err, txt) => {
      try {
        res.send("Xóa thành công _ID: " + _id);
      } catch (err) {
        resp.send(err);
      }
    });
  }
);
app.put(
  "/api/envgame/conchuot2945@/2945/games/update_rank/:id",
  async (req, res) => {
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
  }
);
//===============================================================================
//================================USER============================================
//===============================================================================
app.post("/api/envgame/conchuot2945@/2945/users/create", async (req, res) => {
  let usera = new users(req.body);
  console.log(usera);
  try {
    await usera.save();
    res.send("Create user successfully !");
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/envgame/conchuot2945@/2945/users/read", async (req, res) => {
  users.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
app.put(
  "/api/envgame/conchuot2945@/2945/users/update/:id",
  async (req, res) => {
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
  }
);
// ========================== Feedback===========================
app.post(
  "/api/envgame/conchuot2945@/2945/feedbacks/create",
  async (req, res) => {
    let feedbacka = new feedbacks(req.body);
    try {
      await feedbacka.save();
      res.send(req.body);
    } catch (e) {
      console.log(e);
    }
  }
);
app.get("/api/envgame/conchuot2945@/2945/feedbacks/read", async (req, res) => {
  feedbacks.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
// ========================== Feedback===========================
app.get("/api/envgame/conchuot2945@/2945/chats/read", async (req, res) => {
  chats.find({}, (err, database) => {
    if (err) {
      res.send(err);
    }
    res.send(database);
  });
});
app.post("/api/envgame/conchuot2945@/2945/chats/create", async (req, res) => {
  let chata = new chats(req.body);
  try {
    await chata.save();
    res.send("Create user successfully !");
  } catch (e) {
    console.log(e);
  }
});

const got = require("got"); // if you don't have "got" - install it with "npm install got"
const apiKey = "acc_a94e63861293515";
const apiSecret = "616653c74f9bdf3d2c6595aea6c3dffa";
const axios = require("axios").default;
function detection_imagga(UPLOAD_URL, IO) {
  console.log("loading detection imagga... for:" + UPLOAD_URL);
  const url =
    "http://api.imagga.com/v2/tags?image_url=" + encodeURIComponent(UPLOAD_URL);

  (async () => {
    try {
      const response = await got(url, {
        username: apiKey,
        password: apiSecret,
      });
      // console.log("load successfully!");
      const AI_IN4 = {
        detection: response.body,
        mode: "imagga",
      };
      IO.emit("AI detect imagga", AI_IN4);
    } catch (error) {
      console.log(error.response.body);
    }
  })();
}
function detetion_vision(UPLOAD_URL, IO) {
  console.log("loading detection vision... for:" + UPLOAD_URL);
  // dự phòng nếu imagga API kiểm tra là lá bị hỏng
  var options = {
    method: "POST",
    url: "https://google-ai-vision.p.rapidapi.com/cloudVision/imageCopyrightInfringementDetection",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "google-ai-vision.p.rapidapi.com",
      "x-rapidapi-key": "eb97f0d321mshb47557d453f72dcp1c0748jsne543b4e7e6e3",
    },
    data: {
      source: UPLOAD_URL,
      sourceType: "url",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const AI_IN4 = {
        detection: response.data.webDetection.webEntities,
        mode: "vision",
      };
      IO.emit("AI detect vision", AI_IN4);
    })
    .catch(function (error) {
      console.error(error);
    });
}

var server = require("http").Server(app);
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
  socket.on("send message", (data) => {
    io.emit("send message", { data });
  });
  // socket.on("AI detect", (img) => {
  //   //check mode here
  //   if (img.mode == "" || img.mode == "imagga" || img.mode == null)
  //     detection_imagga(img.url, io);
  //   else detetion_vision(img.url, io);
  // });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
