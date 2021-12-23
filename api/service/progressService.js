const Progress = require('../controller/progressController');
const Material = require('../controller/materialController');

const getPoints = async (userId) => {
  try {
    const points = await Progress.getPoints(userId);
    return points
  } catch (err) {
    throw err;
  }
}

const getDoneModules = async (CourseId, UserId) => {
  try {
    const doneModules = await Progress.getDoneModules(CourseId, UserId);
    return doneModules
  } catch (err) {
    throw err;
  }
}

const getDoneQuizzes = async (ModuleId, UserId) => {
  try {
    const doneQuizzes = await Progress.getDoneQuizzes(ModuleId, UserId);
    return doneQuizzes
  } catch (err) {
    throw err;
  }
}

const getDoneMaterials = async (ModuleId, UserId) => {
  try {
    const doneMaterials = await Progress.getDoneMaterials(ModuleId, UserId);
    return doneMaterials
  } catch (err) {
    throw err;
  }
}

const getDoneProblems = async (ModuleId, UserId) => {
  try {
    const doneProblems = await Progress.getDoneProblems(ModuleId, UserId);
    return doneProblems
  } catch (err) {
    throw err;
  }
}

const saveMaterial = async (id, userId) => {
  try {
    const progress = await Progress.getMaterial(id, userId);
    if (!progress) {
      const material = await Material.getById(id);
      await Progress.saveMaterial(userId, material);
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

const saveOracle = async (id, userId, inputOnly) => {
  try {
    const progress = await Progress.getProblem(id, userId);
    if (!progress || !progress.done) {
      await Progress.saveOracle(id, userId, progress, inputOnly);
    }
  } catch (err) {
    throw err;
  }
}

const saveHint = async (id, userId) => {
  try {
    const progress = await Progress.getQuiz(id, userId);
    if (!progress || !progress.done) {
      await Progress.saveHint(id, userId, progress);
    }
  } catch (err) {
    throw err;
  }
}

const ranking = async () => {
  try{
    const rank = await Progress.ranking();
    return rank;
  } catch(err){
    throw err;
  }
}

module.exports = {
  getPoints,
  getDoneModules,
  getDoneQuizzes,
  getDoneMaterials,
  getDoneProblems,
  saveMaterial,
  saveProblem,
  saveQuiz,
  saveOracle,
  saveHint,
  ranking
};