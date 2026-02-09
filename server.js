require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Entry = require('./models/Entry');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Toggle between Local and Atlas via .env file
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
    .then(() => console.log('✨ Connected to Database'))
    .catch(err => console.log('❌ DB Error:', err));

// API Route to save data
app.post('/api/submit', async (req, res) => {
    try {
        const newEntry = new Entry(req.body);
        await newEntry.save();
        res.status(201).json({ message: 'Success', data: newEntry });
    } catch (err) {
        res.status(500).json({ message: 'Error saving data' });
    }
});

// API Route to fetch all data (for the "Check Entries" feature)
app.get('/api/entries', async (req, res) => {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server floating on port ${PORT}`));