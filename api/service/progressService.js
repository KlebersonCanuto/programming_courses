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

const saveQuiz = async (id, userId) => {
  const material = await Progress.getMaterial(userId, id);
  res.status(200).send({data: material});
}

const saveProblem = async (id, userId) => {
  const material = await Progress.getMaterial(userId, id);
  res.status(200).send({data: material});
}

module.exports = {
  saveMaterial,
  saveProblem,
  saveQuiz
};