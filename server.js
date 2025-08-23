const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Хук для добавления X-Total-Count при пагинации
server.use((req, res, next) => {
    if (req.method === "GET" && req.query._page) {
        res.header("Access-Control-Expose-Headers", "X-Total-Count");
    }
    next();
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});