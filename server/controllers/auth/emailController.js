const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const email = require('../../email');

// const transporter = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.SERVER_EMAIL,
//         pass: process.env.SERVER_EMAIL_PASSWORD
//     }
// }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_EMAIL_PASSWORD
    }
})

// const mailOptions = {
//     from: 'Stack Underflow <stackunderflowofficial@gmail.com>',
//     to: 'mykenzierogers@gmail.com',
//     subject: 'Verfiy Your Account',
//     html: body.body
// };

function sendMail(req, res) {
    const auth = `123dFERT@#$gasdfgq34t`;
    const options = {
        from: `Stack Underflow <${process.env.SERVER_EMAIL}>`,
        to: req.body.email,
        subject: 'Stack Underflow Verification',
        html: email.body(req.body.username, auth)
    }
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            console.log("sent email:", info.response);
            res.status(200).send(info.response);
        }
    });
}

module.exports = {
    sendMail
}