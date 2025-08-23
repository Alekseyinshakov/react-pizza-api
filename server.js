const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Добавляем заголовок X-Total-Count при пагинации
server.use((req, res, next) => {
    if (req.method === "GET" && req.query._page) {
        res.header("Access-Control-Expose-Headers", "X-Total-Count");
    }
    next();
});

server.use(router);

// Экспортируем обработчик для Vercel
module.exports = server;