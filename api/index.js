const jsonServer = require('json-server');

// Создаем сервер
const server = jsonServer.create();

// Подключаем middleware
const middlewares = jsonServer.defaults({
    static: './public', // если есть статические файлы
    bodyParser: true
});

// Подключаем роутер
const router = jsonServer.router('db.json');

// Используем middleware
server.use(middlewares);

// Добавляем кастомные заголовки для CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Добавляем заголовок X-Total-Count для пагинации
server.use((req, res, next) => {
    if (req.method === 'GET' && req.query._page) {
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    }
    next();
});

// Используем роутер
server.use(router);

// Обработчик для Vercel
module.exports = (req, res) => {
    return server(req, res);
};