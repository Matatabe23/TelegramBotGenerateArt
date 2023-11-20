const sqlite3 = require('sqlite3').verbose();
const { Sequelize } = require('sequelize');

// Создание экземпляра базы данных SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './Main.db' // Путь к файлу базы данных SQLite
});

module.exports = sequelize;
