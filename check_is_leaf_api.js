const got = require("got"); // if you don't have "got" - install it with "npm install got"
const apiKey = "acc_a94e63861293515";
const apiSecret = "616653c74f9bdf3d2c6595aea6c3dffa";
const axios = require("axios").default;
module.exports = {
  detection_imagga: function (UPLOAD_URL, IO) {
    console.log("loading detection... ");
    const url =
      "http://api.imagga.com/v2/tags?image_url=" +
      encodeURIComponent(UPLOAD_URL);

    (async () => {
      try {
        const response = await got(url, {
          username: apiKey,
          password: apiSecret,
        });
        // console.log("result: ");
        // console.log(response.body);
        IO.emit("AI detect", response.body);
      } catch (error) {
        console.log(error.response.body);
      }
    })();
  },
  detetion_vision: function (UPLOAD_URL, IO) {
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
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};
