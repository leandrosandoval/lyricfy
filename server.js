// Require the Bolt package (github.com/slackapi/bolt)
require('dotenv').config();
const { App } = require("@slack/bolt");
const { trackSearch } = require('./service/lyrics-service');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command('/lyrics', async({ack, payload, context}) => {
  ack();

  try {
    console.log('texto desde slack:');
    console.log(payload.body.text);
    const matches = await trackSearch(payload.body.text)

    const result = await app.client.chat.postMessage({
      token: context.botToken,
      channel: payload.channel_id,
      text: `Possible track matches for those lyrics are: \n\n - ${matches[0]} \n - ${matches[1]} \n - ${matches[2]}`
    });
    console.log(result);
  }
  catch (error) {
    console.log(error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Lyricfy app is running!');
})();

