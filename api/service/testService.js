const Test = require('../controller/testController');
const FileService = require('./fileService');
const ShellService = require('../utils/shell');

const register = async (tests, file_id) => {
  try {
    const file = await FileService.getFile(file_id);
    const testsExec = await ShellService.execShell(file, tests);
    const testsCreateds = await Test.createMany(testsExec);
    return testsCreateds;
  } catch (err) {
    throw err;
  }
}

const deleteMany = async (ids) => {
  try {
    const tests = await Test.deleteMany(ids);
    return tests;
  } catch (err) {
    throw err;
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const test = await Test.remove(id);
    res.status(200).send({data: test});
  } catch (err) {
    res.status(400).send();
  }
}

module.exports = {
  register,
  deleteMany,
  remove
};