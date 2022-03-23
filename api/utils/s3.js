const fs = require('fs');
const Logger = require('./logger');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const logger = new Logger('s3');

const upload = async (Bucket, Key, Body) => {
	await s3.upload({
		Bucket,
		Key,
		Body,
	}).promise();

	return Key;
};

const fileUpload = async (Key, filePath, isImage) => {
	const Bucket = isImage ? process.env.AWS_IMAGE_BUCKET : process.env.AWS_CODE_BUCKET;
	const Body = fs.readFileSync(filePath.path);

	logger.debug('fileUpload', `file key: ${Key}`);
	logger.debug('fileUpload', `bucket: ${Bucket}`);

	return await upload(Bucket, Key, Body);
};

const codeUpload = async (Key, Body) => {
	const Bucket = process.env.AWS_CODE_BUCKET;

	logger.debug('codeUpload', `file key: ${Key}`);
	logger.debug('codeUpload', `bucket: ${Bucket}`);

	return await upload(Bucket, Key, Body);
};

const getFile = async (Key, isImage) => {
	const Bucket = isImage ? process.env.AWS_IMAGE_BUCKET : process.env.AWS_CODE_BUCKET;

	logger.debug('getFile', `file key: ${Key}`);
	logger.debug('getFile', `bucket: ${Bucket}`);

	const file = await s3.getObject({
		Bucket,
		Key,
	}).promise();

	return file.Body.toString();
};
 
module.exports = { fileUpload, codeUpload, getFile };