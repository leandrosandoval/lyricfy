// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const { lyricsService } = require("trackSearch")

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});



(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
