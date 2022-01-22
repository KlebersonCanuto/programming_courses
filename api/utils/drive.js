const { google } = require('googleapis');
const fs = require('fs');
const driveApi = require('./driveApi');
 
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
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media
    });
    return file.data.id;
  } catch (err) {
    throw err;
  }
}

const getFile = async (id) => {
  const auth = driveApi();
  const drive = google.drive({version: 'v3', auth});
  try {
    const file = await drive.files.get({
      fileId: id,
      alt: 'media'
    });
    return file.data;
  } catch (err) {
    throw err;
  }
}
 
module.exports = { fileUpload, getFile };