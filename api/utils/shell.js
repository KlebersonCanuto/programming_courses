const { PythonShell } = require('python-shell');
const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath)
}

const execShell = (code, inputs) => {
  const randomInt = Math.floor(Math.random() * 10000000000);
  const filePath = `./tmp/tmp-${randomInt}.py`;
  fs.writeFileSync(filePath, code); // Handle if exists

  let finished = 0;
  inputs.map(input => {
    const ps = new PythonShell(filePath);
    ps.send(input);
    ps.end((err, code) => {
      if(err) {
        deleteFile(filePath);
        console.log(err); // Handle error
      }
      console.log('The exit code was: ' + code);
      finished++;
    });
  });

  setInterval(() => {
    if (finished === inputs.length) {
      deleteFile(filePath);
      console.log(finished); // Handle success
    }
  }, 1000);
}

module.exports = {
  execShell
};