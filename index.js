//app created 
const express = require("express");
const app = express();

//Port find krna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// add middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  })
);


const db = require("./config/database");
db.connect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api routes
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload',  Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})

