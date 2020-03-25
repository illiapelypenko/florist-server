const express = require('express');
const Item = require('../models/Item');
const fs = require('fs');
const router = express.Router();
const absolutePath = require('path');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
// const imagesStore = `${__dirname}/../items-images`;

router.get('/all', async (req, res) => {
	try {
		let items = await Item.find();
		items = items
			.map(item => {
				return ({ _id, name, price, path, fileName, type, birthtimeMs } = item);
			})
			.reverse();
		res.json(items);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

router.get('/picture/:fileName', async (req, res) => {
	try {
		res.sendFile(
			`${absolutePath.resolve(
				`${__dirname}/../items-images/${req.params.fileName}`
			)}`
		);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		Item.deleteOne({ _id: req.params.id }, err => console.log);
		res.send();
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

router.post('/upload', async (req, res) => {
	try {
		const file = Object.values(req.files)[0];
		const name = req.body.name;
		const price = req.body.price;
		let path = `./routes/${file.name}`;
		const fileName = file.name;
		const type = req.body.type;
		await file.mv(path);
		const fileContent = fs.readFileSync(__dirname + '\\' + file.name);
		const birthtimeMs = new Date().getTime();

		const params = {
			Bucket: 'florist-images',
			Key: fileName,
			Body: fileContent
		};

		s3.upload(params, async function(err, data) {
			if (err) {
				throw err;
			}
			fs.unlinkSync(path);
			path = data.Location;
			let newItem = new Item({
				name,
				price,
				path,
				fileName,
				type,
				birthtimeMs
			});

			await newItem.save();

			res.status(200).send();
		});
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

module.exports = router;
