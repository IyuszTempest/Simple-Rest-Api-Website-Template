const express = require('express');
const { scrapeAnime, chatAI } = require('./features'); // Ambil fiturnya
const app = express();
const PORT = 3000;

// Middleware API Key Sederhana
const validateKey = (req, res, next) => {
    const { apikey } = req.query;
    if (apikey === 'masamba') return next();
    res.status(403).json({ status: false, message: "Apikey salah!" });
};

// Endpoint untuk Bot WA
app.get('/api/anime', validateKey, async (req, res) => {
    const result = await scrapeAnime();
    res.json({ status: true, creator: "IyuszTempest", result });
});

app.get('/api/ai', validateKey, async (req, res) => {
    const { query } = req.query;
    if (!query) return res.json({ msg: "Tanya apa?" });
    const result = await chatAI(query);
    res.json({ status: true, result });
});

app.listen(PORT, () => {
    console.log(`Server running di https://iyusztempest.my.id`);
});
