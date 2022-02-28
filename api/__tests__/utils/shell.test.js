const shell = require('../../utils/shell');

const code = 'x = input()\ny = input()\nprint(x + y)';

describe('Test Shell', () => {  

	it('Should exec shell', async () => {
		const output = await shell.execShell(code, [{input: 'a\nb'}]);
		expect(output[0].output).toEqual('ab\n');
	});

	it('Should fail to exec shell', async () => {
		await expect(shell.execShell(code, [{input: 'a'}])).rejects.toThrow();
	});

	it('Should compare correct', async () => {
		const correct = await shell.compare(code, [{input: 'a\nb', output: 'ab\n'}]);
		expect(correct).toEqual(true);
	});

	it('Should compare incorrect', async () => {
		const correct = await shell.compare(code, [{input: '1\n2', output: '3\n'}]);
		expect(correct).toEqual(false);
	});

	it('Should fail to compare', async () => {
		await expect(shell.compare(code, [{input: 'a', output: 'a'}])).rejects.toThrow();
	});

	it('Should compareIO correct', async () => {
		const correct = await shell.compareIO(code, 'a\nb', 'ab\n');
		expect(correct).toEqual(true);
	});

	it('Should compareIO incorrect', async () => {
		const correct = await shell.compareIO(code, 'a\nb', 'ba');
		expect(correct).toEqual(false);
	});

	it('Should fail to compareIO', async () => {
		await expect(shell.compareIO(code, 'a', 'ab')).rejects.toThrow();
	});

	it('Should get output', async () => {
		const output = await shell.getOutput(code, 'a\nb');
		expect(output).toEqual('ab\n');
	});

	it('Should fail to get output', async () => {
		await expect(shell.getOutput(code, 'a')).rejects.toThrow();
	});
});