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

module.exports = {
	User,
	examples
}