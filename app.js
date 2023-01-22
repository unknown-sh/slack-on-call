const express = require("express");
require("dotenv").config();
const { App } = require("@slack/bolt");
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});
const { app: rotationSchedule } = require("./rotation_schedule");
const { app: reminder } = require("./reminder");
const { app: sync } = require("./sync");
const { app: override } = require("./override");
const { app: userManagement } = require("./user_management");

const messageAction = require("./message_action");
app.use("/oncall/message_action", messageAction);

// import the @pagerduty/pdjs library
const pdjs = require("@pagerduty/pdjs");

// initialize the pdjs client with the API token and the token type
const pd = pdjs.api({
  token: process.env.PAGERDUTY_API_KEY,
  tokenType: "token",
});

// parse incoming request body as JSON or URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import auth endpoint
//const auth = require("./auth");

// route all requests to /oncall/auth to auth endpoint
//app.use("/oncall/auth", auth);

// Start the app
(async () => {
  await app.start(3000);
  await rotationSchedule.start(3001, app, pd);
  console.log("Rotation schedule feature is running!");
  await reminder.start(3002, app, pd);
  console.log("Reminder feature is running!");
  await sync.start(3003, app, pd);
  console.log("Sync feature is running!");
  await override.start(3004, app, pd);
  console.log("Override feature is running!");
  await userManagement.start(3005, app, pd);
  console.log("User Management feature is running!");
})();
