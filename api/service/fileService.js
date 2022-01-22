const DriveService = require('../utils/drive');
const fs = require('fs');

const uploadFile = async (file, isImage) => {
  let id;
  try{
    const split = file.originalname.split('.');
    id = await DriveService.fileUpload(`${file.filename}.${split[split.length-1]}`, file, isImage);
    fs.unlinkSync(file.path)
  } catch (err) {
    return;
  }
  return id;
}

const getFile = async (file_id) => {
  let file;
  try{
    file = await DriveService.getFile(file_id);
  } catch (err) {
    return;
  }
  return file;
}

module.exports = {
  uploadFile,
  getFile
}