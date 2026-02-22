// server.js
const express = require('express');
const app = express();
const features = require('./features'); //

// Daftar fitur otomatis (Update di sini saja)
const listFeatures = {
    anime: [
        { name: "Livechart", path: "/api/anime?feature=livechart" },
        { name: "Jikan Moe", path: "/api/anime?feature=jikanmoe" }
    ],
    fun: [
        { name: "Lahelu Random", path: "/api/fun?feature=lahelu" },
        { name: "Blue Archive", path: "/api/fun?feature=bluearchive" }
    ],
    downloader: [
        { name: "TikTok DL", path: "/api/downloader?feature=tiktok" }
    ]
};

// Endpoint Metadata biar HTML tau fiturnya apa aja
app.get('/api/list', (req, res) => {
    res.json(listFeatures); //
});

// Middleware & Route lainnya...
app.use(express.static('public')); //
app.listen(3000, () => console.log("Sukses Terhubung!"));

module.exports = app;
