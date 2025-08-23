const express = require('express');
const app = express();

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// Простые тестовые маршруты
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!' });
});

app.get('/posts', (req, res) => {
    res.json([
        { id: 1, title: 'First Post', author: 'John' },
        { id: 2, title: 'Second Post', author: 'Jane' }
    ]);
});

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]);
});

// Обработчик для Vercel
module.exports = app;