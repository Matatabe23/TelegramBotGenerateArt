const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	idTelegram: { type: DataTypes.INTEGER},
	name: {type: DataTypes.STRING},
	sistemName: {type: DataTypes.STRING},
	picture: { type: DataTypes.BLOB },
	name: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: "USER" },
	Crystal: { type: DataTypes.INTEGER, defaultValue: "6"},
})

const examples = sequelize.define('examples', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	type: {type: DataTypes.STRING},
	examplesImage: { type: DataTypes.BLOB },
	examplesText: { type: DataTypes.TEXT },
	Creator: {type: DataTypes.STRING},
	CreatorBool: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const UserSettings = sequelize.define('userSettings', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  model: { type: DataTypes.STRING },
  width: { type: DataTypes.STRING },
  height: { type: DataTypes.STRING },
});

UserSettings.belongsTo(User);

module.exports = {
	User,
	examples,
	UserSettings
}