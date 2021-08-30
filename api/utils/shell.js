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

module.exports = {
  execShell
};