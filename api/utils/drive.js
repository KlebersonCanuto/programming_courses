const { google } = require('googleapis');
const fs = require('fs');
const driveApi = require('./driveApi');
const Logger = require('./logger');
const Errors = require('./errors');

const logger = new Logger('drive');

const fileUpload = async (fileName, filePath, isImage) => {
  const auth = driveApi();
  const fileMetadata = {
    name: fileName,
    parents: [isImage ? process.env.IMAGE_FOLDER_ID : process.env.FOLDER_ID]
  };
  const media = {
    body: fs.createReadStream(filePath.path)
  }
  const drive = google.drive({version: 'v3', auth});
  try {
    logger.info('fileUpload', "creating file");
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media
    });
    const id = file.data.id;
    logger.debug('fileUpload', `file id: ${id}`);
    return id;
  } catch (err) {
    logger.error('fileUpload', err);
    throw Errors.FileErrors.FAILED_TO_UPLOAD_FILE;
  }
}

const getFile = async (id) => {
  const auth = driveApi();
  const drive = google.drive({version: 'v3', auth});
  try {
    logger.debug('getFile', `file id: ${id}`);
    const file = await drive.files.get({
      fileId: id,
      alt: 'media'
    });
    return file.data;
  } catch (err) {
    logger.error('getFile', err);
    throw Errors.FileErrors.FAILED_TO_GET_FILE;
  }
}
 
module.exports = { fileUpload, getFile };