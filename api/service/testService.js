const Test = require('../controller/testController');
const FileService = require('./fileService');
const ShellService = require('../utils/shell');
const Logger = require('../utils/logger');

const logger = new Logger('testService');

const register = async (tests, file_id) => {
	try {
		logger.debug('register', `file id: ${file_id}`);
		if (!tests.length) {
			return [];
		} 
		const file = await FileService.getFile(file_id);
		logger.info('register', 'executing tests');
		const testsExec = await ShellService.execShell(file, tests);
		logger.info('register', `saving ${testsExec.length} tests`);
		const testsCreateds = await Test.createMany(testsExec);
		return testsCreateds;
	} catch (err) {
		logger.error('register', err);
		throw err;
	}
};

const compare = async (tests, answer) => {
	try {
		logger.info('compare', 'comparing tests');
		const correct = await ShellService.compare(answer, tests);
		return correct;
	} catch (err) {
		logger.error('compare', err);
		throw err;
	}
};

const getOutput = async (file_id, input) => {
	try {
		logger.debug('getOutput', `file id: ${file_id}`);
		const file = await FileService.getFile(file_id);
		logger.info('getOutput', 'getting output');
		const output = await ShellService.getOutput(file, input);
		return output;
	} catch (err) {
		logger.error('getOutput', err);
		throw err;
	}
};

const compareIO = async (file_id, input, output) => {
	try {
		logger.debug('compareIO', `file id: ${file_id}`);
		const file = await FileService.getFile(file_id);
		logger.info('compareIO', 'comparing tests');
		const correct = await ShellService.compareIO(file, input, output);
		return correct;
	} catch (err) {
		logger.error('compareIO', err);
		throw err;
	}
};

const deleteMany = async (ids) => {
	try {
		logger.info('deleteMany', `deleting ${ids.length} tests`);
		const tests = await Test.deleteMany(ids);
		return tests;
	} catch (err) {
		logger.error('deleteMany', err);
		throw err;
	}
};

const remove = async (req, res) => {
	try {
		const id = req.params.id;
		logger.debug('remove', `test id: ${id}`);
		const test = await Test.remove(id);
		res.status(200).send({data: test});
	} catch (err) {
		logger.error('remove', err);
		res.status(400).send({message: err.message});
	}
};

module.exports = {
	register,
	compare,
	getOutput,
	compareIO,
	deleteMany,
	remove
};