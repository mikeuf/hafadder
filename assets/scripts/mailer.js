var https = require("https");
var fs = require('fs');
var url = require('url');
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const PORT = 8081;

// BEGIN nodemailer variables
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mikepblack.com.contact.form@gmail.com',
    pass: 'gMonster$2g'
  }
});

 var transporter = nodemailer.createTransport(
{
        service: 'Gmail',
        auth: {
            user: 'mikepblack.com.contact.form@gmail.com', // Your email id
            pass: 'gMonster$2g' // Your password
        }
    });
// END nodemailer variables

// SSL keys
    https.createServer({
 key: fs.readFileSync("/etc/nginx/ssl/mikepblack_com/mikepblack.com.key"),
 cert: fs.readFileSync("/etc/nginx/ssl/mikepblack_com/mikepblack.com.crt")
    }, app).listen(PORT);

// need for "Cross-Origin Resource Sharing" (different ports)
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
 app.use(bodyParser.json())

    app.get('/hello-world', function (req, res) {
      res.header('Content-type', 'text/html');
      return res.end('<h1>Hello, Secure World!</h1>');
    });

    app.post('/submit-contact-form', function (req, res) 
{

      res.header('Content-type', 'text/html');
      res.send('<p style=\'text-align:center\'><span style=\'color:#555555;font-size:3em\'><i class=\'fa fa-envelope-o\'></i></span><br />Your message has been submitted.</p>');

data = req.body;

var bccList = 'mike@mikepblack.com, forward@elmailbox.com';

var mailOptions = {
  from: 'mikepblack.com.contact.form@gmail.com',
  to: data.email,
  bcc: bccList,
  subject: 'Contact form from hafadder.com',
  text: ("[NAME]\n" + data.name + "\n\n[EMAIL]\n" + data.email + "\n\n[MESSAGE]\n" + data.message)
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
res.send(error);
        //res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.send('<p>Message sent: ' + info.response + '</p>');
        // res.json({yo: info.response});
    };
});

return res.end();
    });

console.log("mailer.js server started. Listening on port " + PORT + ".");
