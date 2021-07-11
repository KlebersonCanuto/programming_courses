module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define('Test', {
    input: Sequelize.STRING,
    output: Sequelize.STRING,
    example: Sequelize.BOOLEAN,
    problem_id: Sequelize.INTEGER
  });

  Test.associate = (models) => {
    Test.belongsTo(models.Problem, { foreignKey: 'problem_id' });
  }

  return Test;
};