module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define('Test', {
    input: Sequelize.STRING,
    output: Sequelize.STRING,
    example: Sequelize.BOOLEAN
  });

  return Test;
};