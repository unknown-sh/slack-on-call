require("dotenv").config();
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // handle message_action payload here
    const payload = JSON.parse(req.body.payload);

    // do something with the payload
    // ...

    // send a response back to Slack
    res.json({
        response_type: 'ephemeral',
        text: 'Your message_action was received'
    });
});

module.exports = router;
