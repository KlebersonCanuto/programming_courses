const { PythonShell } = require('python-shell');
const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath)
}

const execShell = (code, tests) => {
  const randomInt = Math.floor(Math.random() * 10000000000);
  const filePath = `./tmp/tmp-${randomInt}.py`;
  fs.writeFileSync(filePath, code); // Handle if exists

  let finished = 0;
  let error;

  return new Promise((resolve, reject) => {
    tests.map(test => {
      const ps = new PythonShell(filePath);
      let output = [];
      ps.on('message', function (message) {
        output.push(message);
      });
      ps.send(test.input);
      ps.end((err) => {
        if (err) {
          error = err;  
          return;     
        }
        test.output = output.join('\n');
        finished++;
      });
    });

    const interval = setInterval(() => {
      if (finished === tests.length) {
        deleteFile(filePath);
        resolve(tests);
        clearInterval(interval);
      } else if (error) {
        deleteFile(filePath);
        reject(error);
        clearInterval(interval);
      }
    }, 200);
  
  })
}

module.exports = {
  execShell
};