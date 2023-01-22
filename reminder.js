require("dotenv").config();
const { App } = require('@slack/bolt');
const { api } = require('@pagerduty/pdjs');

const pd = api({ token: process.env.PAGERDUTY_API_KEY });
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/reminder', async({ command, ack, say }) => {
    // Acknowledge command request
    ack();
    // Retrieve schedule id and reminder message from command arguments
    const scheduleId = command.text.split(' ')[0];
    const reminderMessage = command.text.split(' ')[1];
    // Retrieve the schedule using the PagerDuty API
    const { data: schedule } = await pd.get(`/schedules/${scheduleId}`);
    // Add a reminder to the schedule
    await pd.post(`/schedules/${scheduleId}/reminders`, {
      data: {
        type: 'schedule',
        start: schedule.start,
        end: schedule.end,
        repeat: {
          type: 'daily',
          until_type: 'count',
          until_count: 5,
        },
        schedule_id: scheduleId,
        notification: {
          type: 'email',
          address: schedule.user.email,
          start_notification_time: schedule.start,
          end_notification_time: schedule.start,
          message: reminderMessage,
          included_fields: ['schedule']
        }
      }
    });
    // Confirm that the reminder has been added
    say(`Reminder has been set for the schedule starting ${schedule.start}`);
});

module.exports = { app };
