const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html2plaintext');

//new Email(user, url).sendwelcome();

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from =`bello oladepo <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // sendgrid
            return nodemailer.createTransport({
                service: 'SendinBlue',
                auth: {
                    user: 'bellooladepo@gmail.com',
                    pass: process.env.SENDINBLUE_PASSWORD
                }
            })
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
            // Activate in gmail "less secure app" option
        });
    }

    //send the actual email
    async send(template, subject) {
        // 1) render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/emailTemplates/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        // 2) define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText(html)
            // html
        };

        // 3) creat a transport and send email
        
            await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'welcome to BookMe Service we are happy to meet you');
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password Reset token (valid for ONLY 10 minutes)');
    }
};

