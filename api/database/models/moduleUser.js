module.exports = (sequelize, Sequelize) => {
  const ModuleUser = sequelize.define('ModuleUser', {
    conclusion: Sequelize.DECIMAL,
    conclusionMaterials: Sequelize.DECIMAL,
    conclusionQuizzes: Sequelize.DECIMAL,
    conclusionProblems: Sequelize.DECIMAL,
    UserId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    },
    ModuleId: {
      type: Sequelize.INTEGER,
      field: 'module_id'
    }
  });

  return ModuleUser;
}