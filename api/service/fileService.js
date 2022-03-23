const S3Service = require('../utils/s3');
const fs = require('fs');
const Logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

const logger = new Logger('fileService');

const uploadFile = async (file, isImage) => {
	try{
		const split = file.originalname.split('.');
		const id = await S3Service.fileUpload(`${uuidv4()}.${split[split.length-1]}`, file, isImage);
		logger.debug('uploadFile', `file id: ${id}`);
		fs.unlinkSync(file.path);
		return id;
	} catch (err) {
		logger.error('uploadFile', err);
		throw err;
	}
};

const uploadCode = async (problemId, userId, code) => {
	try{
		const key = `${problemId}/${userId}.py`;
		const id = await S3Service.codeUpload(key, code);
		logger.debug('uploadCode', `file id: ${id}`);
		return id;
	} catch (err) {
		logger.error('uploadCode', err);
		throw err;
	}
};

const getFile = async (id) => {
	try{
		logger.debug('uploadFile', `file id: ${id}`);
		return await S3Service.getFile(id);
	} catch (err) {
		logger.error('getFile', err);
		throw err;
	}
};

module.exports = {
	uploadFile,
	uploadCode,
	getFile
};