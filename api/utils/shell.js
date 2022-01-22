const { PythonShell } = require('python-shell');
const fs = require('fs');
const Logger = require('../utils/logger');

const logger = new Logger('shell');

const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    logger.error("deleteFile", err);
    return;
  }
}

const execShell = (code, tests) => {
  const randomInt = Math.floor(Math.random() * 10000000000);
  const filePath = `./tmp/tmp-${randomInt}.py`;
  logger.info("execShell", "creating file");
  fs.writeFileSync(filePath, code);

  let finished = 0;
  return new Promise((resolve, reject) => {
    tests.map(test => {
      const ps = new PythonShell(filePath);
      let output = [];
      logger.info("execShell", "starting tests");
      ps.on('message', (message) => {
        output.push(message);
      });
      ps.send(test.input);
      ps.end((err) => {
        if (err) {
          logger.error("execShell", err);
          deleteFile(filePath);
          reject(err); 
          return;     
        }
        test.output = output.join('\n');
        finished++;
        if (finished === tests.length) {
          logger.info("execShell", "tests complete");
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
  logger.info("compare", "creating file");
  fs.writeFileSync(filePath, code);

  let finished = 0;
  let correct = 0;
  return new Promise((resolve, reject) => {
    tests.map(test => {
      const ps = new PythonShell(filePath);
      let output = [];
      logger.info("compare", "starting comparison");
      ps.on('message', (message) => {
        output.push(message);
      });
      ps.send(test.input);
      ps.end((err) => {
        if (err) {
          logger.error("compare", err);
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
          logger.info("compare", "comparison done");
          deleteFile(filePath);
          resolve(finished === correct);
          return;
        }
      });
    });  
  })
}

const compareIO = (code, input, answer) => {
  const randomInt = Math.floor(Math.random() * 10000000000);
  const filePath = `./tmp/tmp-${randomInt}.py`;
  logger.info("compareIO", "creating file");
  fs.writeFileSync(filePath, code);

  return new Promise((resolve, reject) => {
      const ps = new PythonShell(filePath);
      let output = [];
      logger.info("compareIO", "starting comparison");
      ps.on('message', (message) => {
        output.push(message);
      });
      ps.send(input);
      ps.end((err) => {
        deleteFile(filePath);
        if (err) {
          logger.error("compareIO", err);
          reject(err); 
          return;     
        }
        const outputStr = output.join('\n');
        logger.info("compareIO", "comparison done");
        resolve(outputStr === answer);
      });
  })
}

const getOutput = (code, input) => {
  const randomInt = Math.floor(Math.random() * 10000000000);
  const filePath = `./tmp/tmp-${randomInt}.py`;
  logger.info("getOutput", "creating file");
  fs.writeFileSync(filePath, code);

  return new Promise((resolve, reject) => {
      const ps = new PythonShell(filePath);
      let output = [];
      logger.info("getOutput", "starting get output");
      ps.on('message', (message) => {
        output.push(message);
      });
      ps.send(input);
      ps.end((err) => {
        deleteFile(filePath);
        if (err) {
          logger.error("getOutput", err);
          reject(err); 
          return;     
        }
        logger.info("getOutput", "finished get output");
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