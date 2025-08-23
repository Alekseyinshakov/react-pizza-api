const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Добавляем заголовок X-Total-Count для пагинации
server.use((req, res, next) => {
    if (req.method === "GET" && req.query._page) {
        res.header("Access-Control-Expose-Headers", "X-Total-Count");
    }
    next();
});

server.use(router);

// Экспортируем как handler для Vercel
module.exports = (req, res) => {
    server(req, res);
};