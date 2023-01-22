require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/oncall/auth', (req, res) => {
    // Verify the request from Slack and obtain the user's access token
    const code = req.query.code;
    const state = req.query.state;

    // Perform additional verification if necessary

    // Exchange the code for an access token
    const options = {
        url: 'https://slack.com/api/oauth.v2.access',
        method: 'POST',
        form: {
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
            code: code
        }
    };

    request(options, (err, response, body) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while processing your request.');
        } else {
            const json = JSON.parse(body);
            if (json.ok) {
                // Store the access token for future use
                const accessToken = json.access_token;
                // store the access token here (i.e in database, or in memory)
                // Send a message to the user indicating that the authorization was successful
                res.send('Authorization successful! You can now use the On-Call Slack app.');
            } else {
                res.status(500).send('An error occurred while processing your request.');
            }
        }
    });
});

app.listen(process.env.AUTH_PORT, () => {
    console.log(`On-Call auth endpoint listening on port ${process.env.PORT}`);
});
