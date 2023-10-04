/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const Aws = require("aws-sdk");

var fileStream;
const s3 = new Aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
});
exports.uploadFile = async (requestPath, file, request, module) => {
   
  const fileName = `${file.fieldname}-${+new Date()}.csv`;
  console.log(file)
  // eslint-disable-next-line no-undef
  const filePath = path.join(__dirname, `../${requestPath}/${fileName}`);

  //   upload persentage show

  fileStream = fs.createWriteStream(filePath);
  fileStream.on("open", () => {
    request.pipe(fileStream);
  });
  fileStream.on("drain", () => {
    // Calculate how much data has been piped yet
    const written = parseInt(fileStream.bytesWritten);
    // eslint-disable-next-line no-undef
    const total = parseInt(headers["content-length"]);
    const pWritten = ((written / total) * 100).toFixed(2);
    console.log(pWritten, "pWritten");
  });

  fileStream.write(file.buffer);
  fileStream.end();

  return {
    name: fileName,
    // eslint-disable-next-line no-undef
    url: `${process.env.DOMAIN}/${module}/${fileName}`,
  };
};
exports.uploadFiles = async (requestPath, file, request) => {
  const fileName = file.name;
  // eslint-disable-next-line no-undef
  const filePath = path.join(__dirname, `../${requestPath}/${fileName}`);

  //   upload persentage show

  fileStream = fs.createWriteStream(filePath);
  fileStream.on("open", () => {
    request.pipe(fileStream);
  });
  fileStream.on("drain", () => {
    // Calculate how much data has been piped yet
    const written = parseInt(fileStream.bytesWritten);
    // eslint-disable-next-line no-undef
    const total = parseInt(headers["content-length"]);
    // eslint-disable-next-line no-unused-vars
    const pWritten = ((written / total) * 100).toFixed(2);
  });

  fileStream.write(file.data);
  fileStream.end();

  return {
    name: fileName,
    url: filePath,
  };
};

// upload file to s3
exports.uploadFileToS3 = async (file) => {
  console.log(file);
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
      Key: file.originalname, // Name of the image
      Body: file.buffer, // Body which will contain the image in buffer format
      ACL: "public-read-write", // defining the permissions to get the public link
      ContentType: "image/png", // Necessary to define the image content-type to view the photo in the browser with the link
    };
    const response = await s3.upload(params).promise();
    return response;
  } catch (error) {
    console.log(error, "error comes from uploadFileToS3");
    return error;
  }
};

// delete s3 image
exports.deleteFileFromS3 = async (file) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
      Key: file, // Name of the image
    };
    const response = await s3.deleteObject(params).promise();
    return response;
  } catch (error) {
    return error;
  }
};

// get s3 image
exports.getFileFromS3 = async (file) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
      Key: file.originalname, // Name of the image
    };
    const response = await s3.getObject(params).promise();
    return response;
  } catch (error) {
    return error;
  }
};


// base64 image upload in s3
exports.uploadFileToS3Base64 = async (body)=>{
  var buf = Buffer.from(body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
  var data = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: body.fileName, 
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL: "public-read-write", // defining the permissions to get the public link

  };
  const response = await s3.upload(data).promise();
  return response;
}