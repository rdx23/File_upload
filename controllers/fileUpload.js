const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file
    const file = req.files.file;
    console.log("FILE AAGaYI JEE -> ", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("PATH-> ", path);

    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      success: true,
      message: "Local file Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};


 
function isFileTypeSupported(type, supportedTypes) {
   
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
 

//image upload ka handler
exports.imageUpload = async (req,res) => {
  try{
    //data fetch
    const {name, tags, email} = req.body;
    console.log(name,tags,email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg" ,"jpeg" , "png"];
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("File Type", fileType);

     // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            })
        }

        //file format support hai
        // Upload to Cloudinary
             // Upload to Cloudinary
        const response = await uploadFileToCloudinary(file, "Rahul");
        console.log(response)


        // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })


        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

 exports.videoUpload = async (req, res) => {
   try {
     // Fetch Data
     const { name, tags, email } = req.body;
     console.log(name, tags, email);

     const file = req.files.videoFile;

     // Validation
     const supportedTypes = ["mp4", "mov"];
     const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type:", fileType);

     // HW - File Maximum 5MB
     if (!isFileTypeSupported(fileType, supportedTypes)) {
       res.status(400).json({
         success: false,
         message: "File type not supported",
       });
     }

     // Supported
     // File Upload to the Cloudinary
     const response = await uploadFileToCloudinary(file, "Rahul");
     console.log(response);

     // Upload To DB
     const fileData = await File.create({
       name,
       tags,
       email,
       imageUrl: response.secure_url,
     });

    //  const file = await vidFile.save();

     res.status(200).json({
       success: true,
       message: "video file uploaded successfully",
       imageUrl: response.secure_url,
     });
   } catch (err) {
     console.error(err);
     res.status(400).json({
       success: false,
       message: "Something went wrong",
     });
   }
 };

 //image size reducer
 exports.imageSizeReducer = async (req,res) => {
  try{
    //data fetch
    const {name, tags, email} = req.body;
    console.log(name,tags,email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg" ,"jpeg" , "png"];
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("File Type", fileType);

     // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            })
        }

        //file format support hai
        // Upload to Cloudinary
             // Upload to Cloudinary
        const response = await uploadFileToCloudinary(file, "Rahul", 100);
        console.log(response)


        // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })


        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    } 
  }