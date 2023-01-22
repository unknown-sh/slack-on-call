const express = require("express");
require("dotenv").config();
const { App } = require("@slack/bolt");
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

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

// import user management endpoint
const userManagement = require("./user_management");

// route all requests to /oncall/auth to auth endpoint
app.use("/oncall/user_management", userManagement);

module.exports = { app };
