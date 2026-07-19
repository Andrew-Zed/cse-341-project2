const express = require('express');

const mongodb = require('./data/database');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
    next();
});

app.use('/', require('./routes'));

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
    res.status(500).json({ error: 'Internal server error' });
});

mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node is running on port ${port}`) });
    }
});
