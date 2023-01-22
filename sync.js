require("dotenv").config();
const { App } = require("@slack/bolt");
const { api } = require("@pagerduty/pdjs");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});
const pd = api({ token: process.env.PAGERDUTY_API_KEY });

app.command("/sync", async ({ command, ack, say }) => {
  // Acknowledge command request
  ack();
  // Retrieve the PagerDuty schedule id from command arguments
  const pdScheduleId = command.text;
  // Retrieve the schedule from PagerDuty
  const { data: schedule } = await pd.get(`/schedules/${pdScheduleId}`);
  // Sync the schedule with the schedule in the app
  app.schedule = schedule;
  // Confirm that the schedule has been synced
  say(`Schedule with id ${pdScheduleId} has been synced`);
});

module.exports = { app };
