import express from "express";
import bodyParser from "body-parser";
import { authenticator } from './connectSdk/authenticator';

const port = process.env.APP_PORT || 8080;
const expressApp = express();
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());

function verifyRequest(req, res, next) {

  if (authenticator.isSignatureValid(req.headers["x-locust-signature"], req.body).valid) {
    next();
  } else {
    res.sendStatus(403);
  }
}

expressApp.post("/init", verifyRequest, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    res.end(JSON.stringify(["init endpoint"]));
  } catch (e) {
    console.log(e);
    res.end(JSON.stringify(e));
  }
});

expressApp.post("/submit", verifyRequest, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    res.end(JSON.stringify(["submit endpoint"]));
  } catch (e) {
    console.log(e);
    res.end(JSON.stringify(e));
  }
});

expressApp.listen(port, () => {
  console.log(`Bot Action Template endpoint is listening on ${port}`);
});

expressApp.get("", (req, res) => {
  res.send("Bot Action Template endpoint running!");
});
