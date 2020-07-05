const fs = require('fs');
const AWS = require('aws-sdk');

const accessKeyId = 'AKIAIGFNDLM2DI4KEZBQ';
const secretAccessKey = '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';

const s3 = new AWS.S3({ accessKeyId, secretAccessKey });

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(__dirname + '/' + fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: 'florist-images',
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(data.Location);
  });
};

// uploadFile('flower2.jpeg');
