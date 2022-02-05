const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const callGDriveApi = () => {
	// Load client secrets from a local file.
	let content;
	try {
		content = fs.readFileSync('credentials.json');
	} catch (err) {
		return console.log('Error loading client secret file:', err);
	}
	return authorize(JSON.parse(content));
};

/**
 * Create an OAuth2 client with the given credentials
 * @param {Object} credentials The authorization client credentials.
 */
const authorize = (credentials) => {
	const {client_secret, client_id, redirect_uris} = credentials.web;
	const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
	let token;
	try {
		token = fs.readFileSync(TOKEN_PATH);
	} catch (err) {
		return getAccessToken(oAuth2Client);
	}
	oAuth2Client.setCredentials(JSON.parse(token));
	return oAuth2Client;
};

/**
 * Get and store new token after prompting for user authorization
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
const getAccessToken = (oAuth2Client) => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error retrieving access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) return console.error(err);
				console.log('Token stored to', TOKEN_PATH);
			});
		});
	});
};

callGDriveApi();

module.exports = callGDriveApi;