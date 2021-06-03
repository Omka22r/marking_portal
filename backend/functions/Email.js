var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'markingportal@gmail.com', // markingportal@gmail.com
        pass: '123TEST567' // 123TEST567
    }
});

// var mailOptions = {
//     from: 'markingportal@gmail.com',
//     to: 'osidhu2@bcit.ca',
//     subject: 'Marking Portal Update',
//     text: 'That was easy!'
//     subject: subject,
//     text: text_body,
//     html: html_body,
// };

exports.sendemail = (callback, message) => {

    transporter.sendMail({
        from: 'markingportal@gmail.com',
        to: 'osidhu2@bcit.ca',
        subject: 'Marking Portal Update',
        text: message.body,
        html: message.result,
    }, 
    
    function (error, info) {
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