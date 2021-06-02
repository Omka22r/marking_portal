var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'markingportal@gmail.com', // markingportal@gmail.com
        pass: '123TEST567' // 123TEST567
    }
});

var mailOptions = {
    from: 'markingportal@gmail.com',
    to: 'osidhu2@bcit.ca',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

exports.sendemail = (callback) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback({
                success: false,
                data: error
            })
        } else {
            callback({
                success: true,
                data: info
            })
        }
    });
}