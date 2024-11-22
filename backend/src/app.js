const express = require('express');
const cors = require('cors');
const injectDb = require('./middlewares/injectDb');

const userRoutes = require('./routes/userRoutes');
const produkRoutes = require('./routes/produkRoutes');
const kalenderRoutes = require('./routes/kalenderRoutes');

const app = express();


app.use(cors());
app.use(express.json());
app.use(injectDb);

app.use('/api', userRoutes);
app.use('/api', produkRoutes);
app.use('/api', kalenderRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

module.exports = app; 

