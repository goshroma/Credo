
require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();


connectDB();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api', recommendationRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

