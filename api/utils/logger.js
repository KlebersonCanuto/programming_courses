const fs = require('fs');

class Log {
  constructor(name) {
    this.name = name;
  }

  log = (prefix, ...data) => {
    const line = `[${prefix}] ${new Date().toISOString()} | ${this.name} | ${data.join(" | ")}`;
    console.log(line);
    fs.appendFile("log.txt", `${line}\n`, 'utf8', () => {});
  };
  
  error = (...data) => {
    this.log("ERROR", ...data)
  }
  
  debug = (...data) => {
    this.log("DEBUG", ...data)
  }
  
  info = (...data) => {
    this.log("INFO", ...data)
  }
}

module.exports = Log;