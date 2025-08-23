const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Чтение данных из db.json
function getData() {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

// Простые маршруты
app.get('/:resource', (req, res) => {
    const data = getData();
    const resource = req.params.resource;

    if (data[resource]) {
        res.json(data[resource]);
    } else {
        res.status(404).json({ error: 'Resource not found' });
    }
});

// Экспорт для Vercel
module.exports = app;