require('dotenv').config()
const sequelize = require('./')
const models = require('./models/models')
const TelegramBot = require('./router/indexBot')