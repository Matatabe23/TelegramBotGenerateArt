const { ApiError } = require('../error/ApiError') // Импортируем класс ApiError для обработки ошибок запросов
const bcrypt = require('bcrypt') // Импортируем библиотеку bcrypt для хэширования паролей
const jwt = require('jsonwebtoken') // Импортируем библиотеку jsonwebtoken для создания и проверки JWT-токенов
const { User } = require('../models/models') // Импортируем модель User из базы данных
const sequelize = require('../db')

// Функция для генерации JWT-токена
// const generateJwt = (id, email, name, role) => {
// 	return jwt.sign({ id, email, name, role }, // Создаем токен с полями id, email, name и role
// 		process.env.SECRET_KEY, // Используем secret key из окружения для подписи токена
// 		{ expiresIn: '24h' }) // Устанавливаем время жизни токена
// }

// Класс для работы с пользователями
class UserController {
	// Метод для регистрации нового пользователя
	async registration(req, res, next) {
		const { email, name, password, role } = req.body // Получаем данные пользователя из запроса


		return res.json({ token }) // Отправляем токен в ответ на запрос
	}


	// Метод для авторизации пользователя
	async login(req, res, next) {
		const { email, password } = req.body // Получаем данные пользователя из запроса

		return res.json({ token }) // Отправляем токен в ответ на запрос
	}
}

module.exports = new UserController()