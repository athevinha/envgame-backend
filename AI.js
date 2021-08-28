const got = require("got"); // if you don't have "got" - install it with "npm install got"

const apiKey = "acc_a94e63861293515";
const apiSecret = "efbb7c90953b168a17e03eae9495edb6";

const imageUrl =
  "https://docs.imagga.com/static/images/docs/sample/japan-605234_1280.jpg";
const url =
  "https://api.imagga.com/v2/tags?image_url=" + encodeURIComponent(imageUrl);
console.log("??");
(async () => {
  try {
    const response = await got(url, { username: apiKey, password: apiSecret });
    console.log(response.body);
  } catch (error) {
    console.log(error.response.body);
  }
})();
