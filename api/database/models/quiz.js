module.exports = (sequelize, Sequelize) => {
	const Quiz = sequelize.define('Quiz', {
		title: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true
			}
		},
		question: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true
			},
		},
		hint: Sequelize.STRING,
		number: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		answers: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true
			},
			get() {
				if (this.getDataValue('answers')) {
					return this.getDataValue('answers').split('====');
				}
				return [];
			},
			set(val) {
				this.setDataValue('answers',val.join('===='));
			},
		},
		choice: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
		options: {
			type: Sequelize.STRING,
			get() {
				if (this.getDataValue('options')) {
					return this.getDataValue('options').split('====');
				}
				return [];
			},
			set(val) {
				this.setDataValue('options',val.join('===='));
			},
		},
		ModuleId: {
			type: Sequelize.INTEGER,
			field: 'module_id',
			allowNull: false,
		},
		done: {
			type: Sequelize.VIRTUAL
		},
		attempts: {
			type: Sequelize.VIRTUAL
		},
		locked: {
			type: Sequelize.VIRTUAL
		},
	});

	return Quiz;
};