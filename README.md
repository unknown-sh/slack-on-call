# On-Call Slack App

On-Call is a rotation schedule management service directly in Slack. It allows you to automate team responsibilities and make sure that important messages are not overlooked. With On-Call, you can create rotation schedules, share team responsibilities, set up recurring reminders, schedule overrides and more.

## Features

- **Easy Schedule Creation**: Create on-call schedules with a variety of frequencies, including daily, weekly, bi-weekly, and monthly.
- **Slack Integration**: Utilizes Slack's built-in user groups and @mentions, eliminating the need for an external pager alert service.
- **User Management**: Effortlessly add or remove team members from schedules and adjust the schedule accordingly.
- **Transparent Shift Assignments**: Keep everyone informed about their upcoming on-call responsibilities.
- **Reminder Notifications**: Send direct or channel messages to remind team members of their on-call duties.
- **Flexible Shift Overrides**: Allow team members to switch shifts in the event of absences or vacation.
- **PagerDuty Synchronization**: Keep your on-call schedules in sync with PagerDuty schedules.

## Installation

To start using the On-Call Slack App, you'll need to install it on your Slack Workspace and set up a PagerDuty account if you don't have one.

### Prerequisites

- A Slack Workspace with the necessary permissions to install apps.
- A PagerDuty account (create one if you don't have one)
- Node.js version 12 or later
- NPM version 6 or later

### Slack Installation

1. Go to the [Slack App Directory](https://slack.com/apps) and search for "On-Call" or you can use this [link](https://slack.com/apps/AXXXXX-on-call) to find the app
2. Click "Add to Slack" and select the Workspace you want to add it to.

### PagerDuty Installation

1. Go to the [PagerDuty website](https://www.pagerduty.com/) and sign up for an account or sign in if you already have one.
2. Once logged in, go to the Configuration menu and select Services.
3. Click on the Add New Service button.
4. Fill in the name of your new service and select a escalation policy.
5. Click on the Add New Service button and copy the service key for later use.
6. Go to the On-Call app settings in your Slack Workspace and enter the PagerDuty service key.

## Configuration

Before using the On-Call Slack App, you'll need to configure the following settings:

- **Slack Workspace**: Install the app on your Slack Workspace by following the instructions in the [Installation](#installation) section.
- **PagerDuty Service Key**: Create a new service in PagerDuty and copy the service key. Then, go to the On-Call app settings in your Slack Workspace and enter the PagerDuty service key.
- **Reminders**: By default, reminders are enabled for all shifts. You can enable or disable reminders for specific shifts by using the `/oncall reminders` command.
- **Timezone**: The app uses your Slack Workspace's timezone for scheduling and reminders. If you need to use a different timezone, please contact our support team.

## Usage

- Create a new schedule by using the `/oncall_schedule_create` command.
  ![Create a new schedule](screenshots/create-schedule.png)
- Add users to the schedule by using the `/oncall_schedule_add` command.
  ![Add users to schedule](screenshots/add-users.gif)
- View the schedule by using the `/oncall_schedule_view` command.
  ![View schedule](screenshots/view-schedule.png)
- Override a shift by using the `/oncall_schedule_override` command.
  ![Override a shift](screenshots/override-shift.gif)
- Enable or disable reminders by using the `/oncall_reminders` command.
  ![Enable or disable reminders](screenshots/reminders.png)
- Connect to PagerDuty by using the `/oncall_pagerduty` command.
  ![Connect to PagerDuty](screenshots/pagerduty.png)

## Troubleshooting

If you encounter any issues while using the On-Call Slack App, please refer to the following list of common issues:

- **I can't install the app on my Slack Workspace**: Make sure you have the necessary permissions to install apps on your Slack Workspace. If you continue to experience issues, please contact our support team.
- **I can't connect to PagerDuty**: Make sure you have entered the correct service key in the On-Call app settings in your Slack Workspace. If you continue to experience issues, please check your PagerDuty service configuration and contact their support team if needed.
- **Reminders are not working**: Make sure that reminders are enabled for the specific shift in

## Contributions

We welcome contributions to the On-Call Slack App. If you wish to contribute, please fork the repo and submit a pull request.

## License

The On-Call Slack App is released under the MIT License. Please refer to the [LICENSE](LICENSE) file for more information.
