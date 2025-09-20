require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API ProcessDoc rodando 🚀');
});
