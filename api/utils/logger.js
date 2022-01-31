const fs = require('fs');

class Log {
  constructor(name) {
    this.name = name;
  }

  log = (prefix, ...data) => {
    const line = `[${prefix}] ${new Date().toISOString()} | ${data.join(" | ")}`;
    console.log(line);
    if (process.env.NODE_ENV !== "test")
      fs.appendFile(`${this.name}.log.txt`, `${line}\n`, 'utf8', () => {});
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