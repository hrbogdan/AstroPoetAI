// JavaScript Document

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json({ extended: true }));

app.use("/files", express.static("files"));
// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/presentation", function (req, res) {
  res.sendFile(path.join(__dirname, "/presentation.html"));
});

// sendFile will go here
app.post("/poem", function (req, res) {
  // BUILD POEM PROMT
  let promt =
    "write a short poem with " +
    req.body.strophes +
    " strophes, each having " +
    req.body.verses +
    " verses about " +
    req.body.theme +
    ", containing the follwing words: " +
    req.body.keywords;

  // BUILD API REQUESTS OPTIONS
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": "b60ca369-2f63-439b-a11f-1d1e4acfd0bb",
    },
    body: JSON.stringify({
      enable_google_results: "true",
      enable_memory: false,
      input_text: promt,
    }),
  };

  const image_options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const image_url =
    "https://api.unsplash.com/search/photos?query=" +
    req.body.theme +
    "&count=1&client_id=kcdrQBRXObctoic4LCCsyMdEBSjuMjEk8sEWHwrnVQc";

  async function get_poem() {
    const response = await fetch(
      "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium&language=en",
      options
    );

    let poem_json = await response.json();
    let poem = poem_json.message;

    return poem;
  }
  async function get_image() {
    const image_response = await fetch(image_url, image_options);

    let image_poem_json = await image_response.json();
    let link = image_poem_json.results[0].urls.small;

    return link;
  }

  // CALL API'S
  async function get_data() {
    try {
      // CALL CHATSONIC API
      let poem = await get_poem();
      // CALL UNSPLASH API
      let link = await get_image();

      // BUILD RESPONSE
      var obj = new Object();
      obj.poem = poem;
      obj.link = link;

      res.end(JSON.stringify(obj));
      res.sendStatus(200);
    } catch (error) {
      poem =
        "Sorry, we could not generate a poem for you at this time, please try again later";
      link = "https://www.freeiconspng.com/uploads/error-icon-7.png";
    }
  }

  get_data();
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
