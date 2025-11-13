require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const routes = require('./src/routes/index');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('✅ EventEase API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
