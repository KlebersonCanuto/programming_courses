const { fileUpload } = require('../utils/drive');
const fs = require("fs");

const uploadFile = async (file) => {
  let id;
  try{
    id = await fileUpload(`${file.filename}.py`, file);
    fs.unlinkSync(file.path)
  } catch (err) {
    return
  }
  return id;
}

module.exports = {
  uploadFile
}