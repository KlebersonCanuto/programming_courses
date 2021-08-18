const { google } = require('googleapis');
const fs = require('fs');
const driveApi = require('./driveApi');
 
const fileUpload = async (fileName, filePath) => {
  const auth = driveApi();
  const fileMetadata = {
    name: fileName,
    parents: [process.env.FOLDER_ID]
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

const getFile = (id, callback) => {
  driveApi((auth) => {
    const drive = google.drive({version: 'v3', auth});
    
    drive.files.get({
      fileId: id,
      alt: 'media'
    }, (err, file) => {
      callback(file.data, err);
    })
  });
}
 
module.exports = { fileUpload, getFile };