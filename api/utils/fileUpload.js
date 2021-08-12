const {google} = require('googleapis');
const fs = require('fs');
 
function fileUpload(fileName, filePath, callback){
    require("./drive")((auth) => {
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
          }, function (err, file) {
            if (err) {
              // Handle error
              console.error(err);
            } else {
              callback(file.data.id);
            }
          });
    });
}
 
module.exports = { fileUpload };