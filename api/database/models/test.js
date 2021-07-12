module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define('Test', {
    input: Sequelize.STRING,
    output: Sequelize.STRING,
    example: Sequelize.BOOLEAN,
    ProblemId: {
      type: Sequelize.INTEGER,
      field: "problem_id"
    }
  });

  return Test;
};