// api/server.js
const express = require('express');
const app = express();
const features = require('./features'); // Mengambil semua fungsi dari features.js

app.use(express.json());

// --- DAFTAR MENU OTOMATIS ---
// Dashboard HTML kamu akan otomatis membaca list ini
const listFeatures = {
    Anime: [
        { name: "Euphy Random", path: "/api/anime?feature=euphy", desc: "Gambar Euphylia Magenta random" },
        { name: "JJ Cosplay", path: "/api/anime?feature=jjcosplay", desc: "Video cosplay random" },
        { name: "Livechart Search", path: "/api/anime?feature=livechart&query=", desc: "Cari anime di Livechart.me" },
        { name: "Jikan Moe", path: "/api/anime?feature=jikanmoe&query=", desc: "Cari anime via Jikan API" }
    ],
    AI: [],
    Downloader: [],
    Fun: [
        { name: "Lahelu Random", path: "/api/fun?feature=lahelu", desc: "Meme random dari Lahelu" }
    ],
    Nsfw: [
        { name: "Wangy NSFW", path: "/api/anime?feature=wangy", desc: "Gambar waifu wangy random" }
    ],
    Tools: []
};

// --- ENDPOINT LIST ---
app.get('/api/list', (req, res) => res.json(listFeatures));

// --- CATEGORY: ANIME ---
app.get('/api/anime', async (req, res) => {
    const { feature, query, apikey } = req.query;
    if (apikey !== 'yusz123') return res.status(403).json({ status: false, msg: "Apikey Salah!" });

    try {
        switch (feature) {
            case 'euphy': 
                return res.json(await features.handleEuphy());
            case 'jjcosplay': 
                return res.json(await features.handleJjcosplay());
            case 'livechart': 
                if (!query) return res.status(400).json({ msg: "Query wajib diisi!" });
                return res.json({ status: "success", author: "IyuszTempest", data: await features.handleLivechart(query) });
            case 'jikanmoe':
                if (!query) return res.status(400).json({ msg: "Query wajib diisi!" });
                return res.json({ status: "success", author: "IyuszTempest", data: await features.handleJikanmoe(query) });
            default: 
                return res.status(400).json({ status: false, msg: "Endpoint Anime tidak ditemukan" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
});

// --- CATEGORY: FUN ---
app.get('/api/fun', async (req, res) => {
    const { feature, query, apikey } = req.query;
    if (apikey !== 'yusz123') return res.status(403).json({ status: false, msg: "Apikey Salah!" });

    try {
        switch (feature) {
            case 'lahelu': 
                return res.json(await features.handleLahelu());
            default: 
                return res.status(400).json({ status: false, msg: "Feature Fun tidak ditemukan" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
});

// --- CATEGORY NSFW ---
app.get('/api/nsfw', async (req, res) => {
    const { feature, query, apikey } = req.query;
    if (apikey !== 'yusz123') return res.status(403).json({ status: false, msg: "Apikey Salah!" });

    try {
        switch (feature) {
            case 'wangy': 
                return res.json(await features.handleWangy());
            default: 
                return res.status(400).json({ status: false, msg: "Endpoint NSFW tidak ditemukan" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
});

// --- CATEGORY TOOLS ---
app.get('/api/tools', async (req, res) => {
    const { feature, apikey } = req.query;
    if (apikey !== 'yusz123') return res.status(403).json({ status: false, msg: "Apikey Salah!" });

    try {
        switch (feature) {
            case 'presetam': 
                return res.json(await features.handlePresetAM());
            default: 
                return res.status(400).json({ status: false, msg: "Endpoint Tools tidak ditemukan" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
});

// Export untuk Vercel
module.exports = app;
