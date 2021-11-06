const express = require('express');
const app = express();
const db = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const flash = require('connect-flash');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

const company = require('./routes/company-routes');
const department = require('./routes/department-routes');
const employee = require('./routes/employee-routes');
const policy = require('./routes/policy-routes');
const attendance = require('./routes/attendance-routes');
const holidays = require('./routes/holidays-routes');


// bring ejs template
app.set('view engine', 'ejs')

// bring body parser 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//bring static
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('node_modules'))

// session and flash config .
app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 }
}))

app.use(flash());

// bring passport 
app.use(passport.initialize());
app.use(passport.session());

//store user object 
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    next()
});

app.get('/', (req, res) => {
    res.redirect('/home')
})

// bring pages routes
const pages = require('./routes/pages.routs')
app.use('/', pages)

// bring user routes
const users = require('./routes/user-routes')
app.use('/users', users);


app.use('/company', company);
app.use('/company', department);
app.use('/company', employee);
app.use('/company', policy);
app.use('/company', attendance);
app.use('/company', holidays);

// contact us send to email
app.post('/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'leif85@ethereal.email', // generated ethereal user
            pass: 'RZGSFB1GBzajQJFfAq', // generated ethereal password
        },
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"EHRManage" <leif85@ethereal.email>', // sender address
        to: 'soliman.shahin94@gmail.com', // list of receivers
        subject: 'Contact Us Request', // Subject line
        text: 'Hello EHRManage', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.redirect('/home')
    });
});

// listen to port 
let port = process.env.PORT || 1212;
app.listen(port, () => {
    console.log(' app is working on port : http://localhost:' + port)
})