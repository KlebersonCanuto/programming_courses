const DriveService = require('../utils/drive');
const fs = require("fs");

const uploadFile = async (file) => {
  let id;
  try{
    id = await DriveService.fileUpload(`${file.filename}.py`, file);
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