const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const uploadFile = fileName => {
	// Read content from the file
	const fileContent = fs.readFileSync(__dirname + '\\' + fileName);

	// Setting up S3 upload parameters
	const params = {
		Bucket: 'florist-images',
		Key: fileName, // File name you want to save as in S3
		Body: fileContent
	};

	// Uploading files to the bucket
	s3.upload(params, function(err, data) {
		if (err) {
			throw err;
		}
		console.log(data.Location);
	});
};

uploadFile('img0.jpeg');
