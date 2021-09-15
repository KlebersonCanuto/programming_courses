const Progress = require('../controller/progressController');
const Material = require('../controller/materialController');

const saveMaterial = async (id, userId) => {
  try {
    const progress = await Progress.getMaterial(id, userId);
    if (!progress) {
      const material = await Material.getById(id);
      await Progress.saveMaterial(id, userId, material.complementary);
    }
  } catch (err) {
    throw err;
  }
}

const saveQuiz = async (id, userId, done) => {
  try {
    const progress = await Progress.getQuiz(id, userId);
    if (!progress || !progress.done) {
      await Progress.saveQuiz(id, userId, progress, done);
    }
  } catch (err) {
    throw err;
  }
}

const saveProblem = async (id, userId, done) => {
  try {
    const progress = await Progress.getProblem(id, userId);
    if (!progress || !progress.done) {
      await Progress.saveProblem(id, userId, progress, done);
    }
  } catch (err) {
    throw err;
  }
}

const saveOracle = async (id, userId) => {
  try {
    const progress = await Progress.getProblem(id, userId);
    if (!progress || !progress.done) {
      await Progress.saveOracle(id, userId, progress);
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  saveMaterial,
  saveProblem,
  saveQuiz,
  saveOracle
};