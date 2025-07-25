const express = require('express');
require('dotenv').config();
const app = express();
const giftsRoutes = require('./routes/gifts.routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('On est là pour offrir des cadeaux 🎁');
});

app.use('/gifts', giftsRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
