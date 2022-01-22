const DriveService = require('../utils/drive');
const fs = require('fs');
const Logger = require('../utils/logger');

const logger = new Logger('fileService');

const uploadFile = async (file, isImage) => {
  try{
    const split = file.originalname.split('.');
    const id = await DriveService.fileUpload(`${file.filename}.${split[split.length-1]}`, file, isImage);
    logger.debug('uploadFile', `file id: ${id}`);
    fs.unlinkSync(file.path)
    return id;
  } catch (err) {
    logger.error('uploadFile', err);
    throw err;
  }
}

const getFile = async (id) => {
  try{
    logger.debug('uploadFile', `file id: ${id}`);
    return await DriveService.getFile(id);
  } catch (err) {
    logger.error('getFile', err);
    throw err;
  }
}

module.exports = {
  uploadFile,
  getFile
}