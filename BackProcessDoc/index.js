require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const processRoutes = require('./src/routes/processRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/process', processRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => res.send('API ProcessDoc rodando 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
