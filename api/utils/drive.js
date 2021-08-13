const { google } = require('googleapis');
const fs = require('fs');
const driveApi = require('./driveApi');
 
const fileUpload = (fileName, filePath, callback) => {
  driveApi((auth) => {
    const fileMetadata = {
      name: fileName,
      parents: [process.env.FOLDER_ID]
    };
    const media = {
      body: fs.createReadStream(filePath)
    }
    const drive = google.drive({version: 'v3', auth});

    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    }, (err, file) => {
      callback(file.data.id, err);
    });
  });
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