const express = require("express");
const hooksServer = express();
hooksServer.use(express.json());

let responseCode = 200;
let hooksPath = "/hooks";
let hooksRecieved = [];

let hooksServerPort = 3005;

hooksServer.post(hooksPath, async (req, resp) => {
  const hookData = { recievedAt: Date(), headers: req.headers, body: req.body };
  resp.sendStatus(responseCode);
  hooksRecieved.push(hookData);
});

hooksServer.get(hooksPath, (req, resp) => {
  resp.send({hooks:hooksRecieved});
  if(req.query.clear)
    hooksRecieved=[];
});

hooksServer.listen(hooksServerPort, () => {
  console.log(`Listening for hooks at ${hooksPath} on ${hooksServerPort}`);
});