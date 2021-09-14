const { CourseUser, MaterialUser, PointsUser, ProblemUser, QuizUser, Sequelize } = require('../database/models');

const addPoints = async (UserId, points) => {
  try {
    const pointsUser = await PointsUser.findOne({ where: { UserId } })
    if (!pointsUser) {
      await PointsUser.create({
        UserId,
        points
      });
    } else {
      await PointsUser.update({
        field: Sequelize.literal(`points + ${points}`)
      }, { where: { id: pointsUser.id }})
    }
    return;
  } catch (err) {
    throw 400;
  }
}

const getMaterial = async (MaterialId, UserId) => {
  try {
    const problemUser = await MaterialUser.findOne(
      { where: { UserId, MaterialId }}, {
      attributes: ['done', 'oracle', 'attempts']
    });  
    return problemUser;
  } catch (err) {
    throw 400;
  }
}

const saveMaterial = async (MaterialId, UserId, complementary) => {
  try {
    const problemUser = await MaterialUser.create({
      read: true, 
      MaterialId,
      UserId
    }); 
    await addPoints(UserId, 1);
    if (!complementary) {
      // save module progress
    }
    return problemUser;
  } catch (err) {
    throw 400;
  }
}



module.exports = {
  getMaterial,
  saveMaterial
};