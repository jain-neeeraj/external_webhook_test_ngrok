const { fork } = require("child_process");
const { join } = require("path");
const ngrok = require("ngrok");

module.exports = class WebhooksListener {
  async setup(port=3005){
      this.hooksServerProcess = fork(join(__dirname, "webhookServer.js"));

      const url = await ngrok.connect(port);

      return { url: `${url}/hooks`, };
  }

  async stop(){
      this.hooksServerProcess.kill("SIGKILL");
      await  ngrok.kill();

  }
}

