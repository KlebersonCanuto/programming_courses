const s3 = require('../../utils/s3');
const fs = require('fs');
require('dotenv').config();

describe('Test s3', () => {  
	let fileId;
	let content;

	it('Should upload to s3', async () => {
		content = fs.readFileSync(process.env.TEST_FILE, 'utf-8');
		fileId = await s3.fileUpload('test.txt', {path: process.env.TEST_FILE}, false);
	});

	it('Should get file', async () => {
		const fileContent = await s3.getFile(fileId, false);
		expect(fileContent).toEqual(content);
	});
});