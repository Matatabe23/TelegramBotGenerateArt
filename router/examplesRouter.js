const Router = require('express') // Подключаем библиотеку Express и получаем функцию Router
const router = new Router() // Создаем объект роутера с помощью функции Router
const examplesControllers = require('../controllers/examplesControllers') // Подключаем контроллер пользователя
// const authMiddleware = require('../middleware/authMiddleware') // Подключаем middleware для проверки авторизации


router.post('/CreateRecord', examplesControllers.CreateRecord) // Создаем маршрут для регистрации, указываем метод POST и функцию-обработчик


module.exports = router // Экспортируем объект роутера для использования в других модулях