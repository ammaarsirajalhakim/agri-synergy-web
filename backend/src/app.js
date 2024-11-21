const express = require('express');
const cors = require('cors');
const injectDb = require('./middlewares/injectDb');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(injectDb);

app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

module.exports = app; 
