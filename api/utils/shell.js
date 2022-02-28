const Logger = require('./logger');
const Errors = require('./errors');
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

const FunctionName = 'execPythonCode';
const logger = new Logger('shell');

const execShell = (code, tests) => {
	let finished = 0;
	return new Promise((resolve, reject) => {
		logger.info('execShell', 'starting tests');
		tests.map(test => {
			const params = {
				FunctionName, 
				InvocationType: 'RequestResponse',
				LogType: 'Tail',
				Payload: `{ "code": "${code.replace(/\n/g,'\\n').replace(/\t/g,'\\t')}", "input": "${test.input.replace(/\n/g,'\\n')}" }`
			};
			
			const lambda = new AWS.Lambda();
			lambda.invoke(params, function(err, data) {
				if (err) {
					logger.error('execShell', err);
					reject(Errors.ExecErrors.FAILED_TO_EXECUTE); 
					return;     
				} 

				const response = JSON.parse(data.Payload);

				if (response.statusCode !== 200) {
					logger.error('execShell', response.message);
					reject(Errors.ExecErrors.FAILED_TO_EXECUTE);
					return;
				}

				test.output = response.body;
				finished++;
				if (finished === tests.length) {
					logger.info('execShell', 'tests complete');
					resolve(tests);
				}
			});
		});  
	});
};

const compare = (code, tests) => {
	let finished = 0;
	let correct = 0;
	return new Promise((resolve, reject) => {
		tests.map(test => {
			logger.info('compare', 'starting comparison');
			const params = {
				FunctionName, 
				InvocationType: 'RequestResponse',
				LogType: 'Tail',
				Payload: `{ "code": "${code.replace(/\n/g,'\\n').replace(/\t/g,'\\t')}", "input": "${test.input.replace(/\n/g,'\\n')}" }`
			};
			
			const lambda = new AWS.Lambda();
			lambda.invoke(params, function(err, data) {
				if (err) {
					logger.error('compare', err);
					reject(Errors.ExecErrors.FAILED_TO_EXECUTE); 
					return;     
				} 

				const response = JSON.parse(data.Payload);

				if (response.statusCode !== 200) {
					logger.error('compare', response.message);
					reject(Errors.ExecErrors.FAILED_TO_COMPARE); 
					return;
				}

				finished++;
				if (response.body === test.output) {
					correct++;
				}

				if (finished === tests.length) {
					logger.info('compare', 'comparison done');
					resolve(finished === correct);
				}
			});
		});  
	});
};

const compareIO = (code, input, answer) => {
	return new Promise((resolve, reject) => {
		logger.info('compareIO', 'starting comparison');
		const params = {
			FunctionName, 
			InvocationType: 'RequestResponse',
			LogType: 'Tail',
			Payload: `{ "code": "${code.replace(/\n/g,'\\n').replace(/\t/g,'\\t')}", "input": "${input.replace(/\n/g,'\\n')}" }`
		};
		
		const lambda = new AWS.Lambda();
		lambda.invoke(params, function(err, data) {
			if (err) {
				logger.error('compareIO', err);
				reject(Errors.ExecErrors.FAILED_TO_COMPARE_IO); 
				return;     
			} 

			const response = JSON.parse(data.Payload);

			if (response.statusCode !== 200) {
				logger.error('compareIO', response.message);
				reject(Errors.ExecErrors.FAILED_TO_COMPARE_IO); 
				return;
			}

			logger.info('compareIO', 'comparison done');
			resolve(response.body === answer);
		});
	});
};

const getOutput = (code, input) => {
	return new Promise((resolve, reject) => {
		logger.info('getOutput', 'starting get output');
		const params = {
			FunctionName, 
			InvocationType: 'RequestResponse',
			LogType: 'Tail',
			Payload: `{ "code": "${code.replace(/\n/g,'\\n').replace(/\t/g,'\\t')}", "input": "${input.replace(/\n/g,'\\n')}" }`
		};
		
		const lambda = new AWS.Lambda();
		lambda.invoke(params, function(err, data) {
			if (err) {
				logger.error('getOutput', err);
				reject(Errors.ExecErrors.FAILED_TO_GET_OUTPUT); 
				return;     
			} 

			const response = JSON.parse(data.Payload);

			if (response.statusCode !== 200) {
				logger.error('getOutput', response.message);
				reject(Errors.ExecErrors.FAILED_TO_GET_OUTPUT); 
				return;
			}

			logger.info('getOutput', 'finished get output');
			resolve(response.body);
		});
	});
};

module.exports = {
	execShell,
	compare,
	compareIO,
	getOutput
};