const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

// post middleware
fileSchema.post("save", async function (doc) {
  try {
    //transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // send mail
    let info = transporter.sendMail({
        from: `Rahul dora`,
        to: doc.email,
        subject: "New File Uploaded to Cloudinary",
        html: `<h2>File Uploaded</h2>`,
    });

    console.log("INFO: ", info);
  } catch (error) {
    console.log(err);
  }
});


const File = mongoose.model("File",fileSchema);
module.exports = File;