const { PythonShell } = require('python-shell');
const fs = require('fs');

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath)
}

const execShell = (code, tests) => {
  const randomInt = Math.floor(Math.random() * 10000000000);
  const filePath = `./tmp/tmp-${randomInt}.py`;
  fs.writeFileSync(filePath, code); // Handle if exists

  let finished = 0;
  return new Promise((resolve, reject) => {
    tests.map(test => {
      const ps = new PythonShell(filePath);
      let output = [];
      ps.on('message', (message) => {
        output.push(message);
      });
      ps.send(test.input);
      ps.end((err) => {
        if (err) {
          deleteFile(filePath);
          reject(err); 
          return;     
        }
        test.output = output.join('\n');
        finished++;
        if (finished === tests.length) {
          deleteFile(filePath);
          resolve(tests);
        }
      });
    });  
  })
}

const compare = (code, tests) => {
  const randomInt = Math.floor(Math.random() * 10000000000);
  const filePath = `./tmp/tmp-${randomInt}.py`;
  fs.writeFileSync(filePath, code); // Handle if exists

  let finished = 0;
  let correct = 0;
  return new Promise((resolve, reject) => {
    tests.map(test => {
      const ps = new PythonShell(filePath);
      let output = [];
      ps.on('message', (message) => {
        output.push(message);
      });
      ps.send(test.input);
      ps.end((err) => {
        if (err) {
          deleteFile(filePath);
          reject(err); 
          return;     
        }
        const outputStr = output.join('\n');
        finished++;
        if (outputStr === test.output) {
          correct++;
        }
        if (finished === tests.length) {
          deleteFile(filePath);
          resolve(finished === correct);
        }
      });
    });  
  })
}

const compareIO = (code, input, answer) => {
  const randomInt = Math.floor(Math.random() * 10000000000);
  const filePath = `./tmp/tmp-${randomInt}.py`;
  fs.writeFileSync(filePath, code); // Handle if exists

  return new Promise((resolve, reject) => {
      const ps = new PythonShell(filePath);
      let output = [];
      ps.on('message', (message) => {
        output.push(message);
      });
      ps.send(input);
      ps.end((err) => {
        deleteFile(filePath);
        if (err) {
          reject(err); 
          return;     
        }
        const outputStr = output.join('\n');
        resolve(outputStr === answer);
      });
  })
}

const getOutput = (code, input) => {
  const randomInt = Math.floor(Math.random() * 10000000000);
  const filePath = `./tmp/tmp-${randomInt}.py`;
  fs.writeFileSync(filePath, code); // Handle if exists

  return new Promise((resolve, reject) => {
      const ps = new PythonShell(filePath);
      let output = [];
      ps.on('message', (message) => {
        output.push(message);
      });
      ps.send(input);
      ps.end((err) => {
        deleteFile(filePath);
        if (err) {
          reject(err); 
          return;     
        }
        resolve(output.join('\n'));
      });
  })
}

module.exports = {
  execShell,
  compare,
  compareIO,
  getOutput
};