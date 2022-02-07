const drive = require('../../utils/drive');
const fs = require('fs');
require('dotenv').config();

describe('Test Drive', () => {  
	let fileId;
	let content;

	it('Should upload to drive', async () => {
        content = fs.readFileSync(process.env.TEST_FILE, 'utf-8');
        fileId = await drive.fileUpload('test.txt', {path: process.env.TEST_FILE}, false);
	});

	it('Should get file', async () => {
        const fileContent = await drive.getFile(fileId);
		expect(fileContent).toEqual(content);
	});
});