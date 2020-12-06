const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Simon's Website !</h1>");
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.simonvaissiere.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "contact@simonvaissiere.com", // generated ethereal user
      pass: "simonvaissiere" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"Simon Vaissiere" <contact@simonvaissiere.com>', // sender address
    to: "lethi.ltn@gmail.com, contact@simonvaissiere.com", // list of receivers
    subject: `${user.name} vous a envoyé un message depuis votre site !`, // Subject line
    html: `<h2>Bonjour Simon !</h2><br>
    <p>Une personne vous a envoyé un message depuis votre site internet, voici les détails : </p></br>
    <ul>
        <li>Nom : ${user.name}</li>
        <li>Email : ${user.email}</li>
        <li>Objet : ${user.subject}</li>
        <li>Message : ${user.message}</li>
    </ul></br>

    <p>Bonne journée !</p>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
