const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const { mongoURL } = require('./config');

const app = express();

// connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// middleware for parsing request bodies
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', authRoutes);
app.use('/teams', teamRoutes);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
