// const got = require("got"); // if you don't have "got" - install it with "npm install got"
// const apiKey = "acc_a94e63861293515";
// const apiSecret = "616653c74f9bdf3d2c6595aea6c3dffa";
// const axios = require("axios").default;
// module.exports = {
//   detection_imagga: function (UPLOAD_URL, IO) {
//     console.log("loading detection imagga... for:" + UPLOAD_URL);
//     const url =
//       "http://api.imagga.com/v2/tags?image_url=" +
//       encodeURIComponent(UPLOAD_URL);

//     (async () => {
//       try {
//         const response = await got(url, {
//           username: apiKey,
//           password: apiSecret,
//         });
//         // console.log("load successfully!");
//         const AI_IN4 = {
//           detection: response.body,
//           mode: "imagga",
//         };
//         IO.emit("AI detect imagga", AI_IN4);
//       } catch (error) {
//         console.log(error.response.body);
//       }
//     })();
//   },
//   detetion_vision: function (UPLOAD_URL, IO) {
//     console.log("loading detection vision... for:" + UPLOAD_URL);
//     // dự phòng nếu imagga API kiểm tra là lá bị hỏng
//     var options = {
//       method: "POST",
//       url: "https://google-ai-vision.p.rapidapi.com/cloudVision/imageCopyrightInfringementDetection",
//       headers: {
//         "content-type": "application/json",
//         "x-rapidapi-host": "google-ai-vision.p.rapidapi.com",
//         "x-rapidapi-key": "eb97f0d321mshb47557d453f72dcp1c0748jsne543b4e7e6e3",
//       },
//       data: {
//         source: UPLOAD_URL,
//         sourceType: "url",
//       },
//     };

//     axios
//       .request(options)
//       .then(function (response) {
//         console.log(response.data);
//         const AI_IN4 = {
//           detection: response.data.webDetection.webEntities,
//           mode: "vision",
//         };
//         IO.emit("AI detect vision", AI_IN4);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   },
// };
