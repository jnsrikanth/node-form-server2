let express = require("express"),
  path = require('path'),
  nodeMailer = require('nodemailer'),
  multer = require('multer'),
  bodyParser = require('body-parser');

var upload = multer();

let app = express();

app.use(express.static('public/thank-you/dist/'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(upload.array());

app.post('/myaction', function (req, res) {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: 'srikanth.jallapuram@gmail.com',
          pass: 'Accel@$123'
      }
  });

  let mailOptions = {
      // should be replaced with real recipient's account
      to: 'srikanthjnr@yahoo.com',
      subject:'Form Submission: Technovature Software Contact Form',
      phone: req.body.phonenum,
      text: req.body.briefdesc,
      html: `First Name: ${req.body.firstname} <br> Last Name: ${req.body.lastname} <br> Brief Description: ${req.body.briefdescription} <br> Phonenumber: ${req.body.phonenum} <br> Email: ${req.body.email}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.writeHead(301, { Location: 'index.html' });
  res.end(JSON.stringify(req.body, null, 2));
});

let server = app.listen(8081, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
