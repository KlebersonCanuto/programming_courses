const { MaterialUser, PointsUser, ProblemUser, QuizUser, Sequelize } = require('../database/models');

const addPoints = async (UserId, points) => {
  try {
    const pointsUser = await PointsUser.findOne({ where: { UserId } });
    if (!pointsUser) {
      await PointsUser.create({
        UserId,
        points
      });
    } else {
      await PointsUser.update({
        points: Sequelize.literal(`points + ${points}`)
      }, { where: { id: pointsUser.id }})
    }
    return;
  } catch (err) {
    throw 400;
  }
}

const getPoints = async (UserId) => {
  try {
    const pointsUser = await PointsUser.findOne({ where: { UserId } }, {
      attributes: ['points']
    });
    if (!pointsUser) {
      return 0;
    }
    return pointsUser.points;
  } catch (err) {
    throw 400;
  }
}

const getMaterial = async (MaterialId, UserId) => {
  try {
    const materialUser = await MaterialUser.findOne(
      { where: { UserId, MaterialId }}, {
      attributes: ['done', 'oracle', 'attempts']
    });  
    return materialUser;
  } catch (err) {
    throw 400;
  }
}

const saveMaterial = async (MaterialId, UserId, complementary) => {
  try {
    await MaterialUser.create({
      read: true, 
      MaterialId,
      UserId
    }); 

    await addPoints(UserId, 1);
    if (!complementary) {
      // save module progress
    }
  } catch (err) {
    throw 400;
  }
}

const getQuiz = async (QuizId, UserId) => {
  try {
    const quizUser = await QuizUser.findOne(
      { where: { UserId, QuizId }}, {
      attributes: ['done', 'attempts']
    });  
    return quizUser;
  } catch (err) {
    throw 400;
  }
}

const saveQuiz = async (QuizId, UserId, quizUser, done) => {
  try {
    let attempts;
    if (!quizUser) {
      attempts = 1;
      await QuizUser.create({
        QuizId,
        UserId,
        done,
        attempts
      }); 
    } else {
      attempts = quizUser.attempts + 1;
      await QuizUser.update({
        attempts,
        done
      }, { where: { UserId, QuizId }})
    }

    if (done) {
      await addPoints(UserId, Math.max(6-attempts, 3));
      // save module progress
    }
  } catch (err) {
    throw 400;
  }
}

const getProblem = async (ProblemId, UserId) => {
  try {
    const problemUser = await ProblemUser.findOne(
      { where: { UserId, ProblemId }}, {
      attributes: ['done', 'attempts', 'oracle']
    });  
    return problemUser;
  } catch (err) {
    throw 400;
  }
}

const saveProblem = async (ProblemId, UserId, problemUser, done) => {
  try {
    let attempts;
    if (!problemUser) {
      attempts = 1;
      await ProblemUser.create({
        ProblemId,
        UserId,
        done,
        attempts,
        oracle: false
      }); 
    } else {
      attempts = problemUser.attempts + 1;
      await ProblemUser.update({
        attempts,
        done
      }, { where: { UserId, ProblemId }})
    }

    if (done) {
      await addPoints(UserId, Math.max(11-attempts, 5));
      // save module progress
    }
  } catch (err) {
    throw 400;
  }
}

const saveOracle = async (ProblemId, UserId, problemUser, inputOnly) => {
  try {
    if (!problemUser) {
      await ProblemUser.create({
        ProblemId,
        UserId,
        done: false,
        attempts: 0,
        oracle: true
      }); 
      if (!inputOnly) {
        await addPoints(UserId, 2);
      }
    } else {
      await ProblemUser.update({
        oracle: true
      }, { where: { UserId, ProblemId }})
    }
  } catch (err) {
    throw 400;
  }
}

const ranking = async () => {
  try{
    const user = await PointsUser.findAll({
      include: {association: 'user'}
    });
    return user;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  getPoints,
  getMaterial,
  saveMaterial,
  getQuiz,
  saveQuiz,
  getProblem,
  saveProblem,
  saveOracle,
  ranking
};