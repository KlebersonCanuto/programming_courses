module.exports = (sequelize, Sequelize) => {
	const Material = sequelize.define('Material', {
		title: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true
			}
		},
		content: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true
			}
		},
		video_link: {
			type: Sequelize.STRING,
		},
		complementary: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		number: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		ModuleId: {
			type: Sequelize.INTEGER,
			field: 'module_id',
			allowNull: false,
		},
		done: {
			type: Sequelize.VIRTUAL
		},
		locked: {
			type: Sequelize.VIRTUAL
		},
	});

	return Material;
};