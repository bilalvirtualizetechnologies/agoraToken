const express = require('express')
const cors = require('cors')
const { RtcTokenBuilder, RtcRole } = require('agora-access-token')
const app = express()


app.use(express.json())
app.use(cors())

const port = 3000

// Endpoint to generate token 
app.post('/tokenGenerate', async (req, res) => {

    try {
        const { id, channelname } = req.body;

        console.log("===============", req.body);

        if(id == "" || channelname == "") return res.status(400).json({ success: true, message: 'All fields is required [id, channelname]' });

        // Agora credentials 
        const appId = 'ab4c70fd3a3a42c39c42fdeba0339560';
        const appCertificate = '02519802d7644d4e9dde285516978386';

        // Channel and user info
        const channelName = channelname;
        const uid = id;
        const userAccount = 'User-Account';
        const role = RtcRole.PUBLISHER;

        // Expiration time 
        const expirationTimeInSeconds = 3600
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

        // Generate token
        const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);

        // Send back token in response 
        res.status(201).json({ success: true, token: tokenA });

        // Catch errors    
    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
})

app.listen(port, () => {
    console.log(`Connect app listing on port http://localhost:${port}`);
})