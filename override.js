require("dotenv").config();
const { App } = require("@slack/bolt");
const { api } = require("@pagerduty/pdjs");

const pd = api({ token: process.env.PAGERDUTY_API_KEY });
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/override", async ({ command, ack, say }) => {
  // Acknowledge command request
  ack();
  // Retrieve the PagerDuty schedule id and override message from command arguments
  const [pdScheduleId, overrideMessage] = command.text.split(" ");
  const start = new Date(overrideMessage.start).toISOString();
  const end = new Date(overrideMessage.end).toISOString();

  await pd.post(`/schedules/${pdScheduleId}/overrides`, {
    data: {
      start: start,
      end: end,
      user_id: overrideMessage.user_id,
    },
  });
  // Confirm that the override has been added
  say(`Override has been set for the schedule ${pdScheduleId}`);
});

module.exports = { app };
