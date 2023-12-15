require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const emailTemplate = require("./Template/emailTemplate");
const PORT = process.env.PORT || 5000;
const nodemailer = require("nodemailer");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cros
app.use(cors());


app.get("/", (request, response) => {
    response.json({
      message: "SERVER UP",
    });
  });

  app.post("/api/otpVerify", async (req,res)=>{

    const {Otp, fullName, email} = req.body;
    console.log(Otp)

    const OTPCODE = Otp

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    });

    const emailData = await transporter.sendMail({
      from: "ayansheikh6600@gmail.com",
      to: email,
      subject: "Email Verfication",
      html: emailTemplate(fullName, OTPCODE),
    });

    res.json({
        Email : "Succefully Send"
    })


  })
  
  app.listen(PORT, () =>
    console.log(`server running on http://localhost:${PORT}`)
  );