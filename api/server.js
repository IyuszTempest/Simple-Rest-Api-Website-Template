// api/server.js
const express = require('express');
const app = express();
const { handleLahelu, handleBlueArchive } = require('./features');

app.use(express.json());

// DAFTAR MENU OTOMATIS
const listFeatures = {
    //kategori Anime
    Anime: [
        { name: "Blue Archive", path: "/api/fun?feature=bluearchive&query=", desc: "Data karakter Blue Archive" },
        { name: "Euphy Random", path: "/api/anime?feature=euphy", desc: "Gambar Euphylia Magenta random" },
        { name: "JJ Cosplay", path: "/api/anime?feature=jjcosplay", desc: "Video cosplay random" },
        { name: "Livechart Search", path: "/api/anime?feature=livechart&query=", desc: "Cari anime di Livechart.me" },
        { name: "Jikan Moe", path: "/api/anime?feature=jikanmoe&query=", desc: "Cari anime via Jikan API" }
        ],

    //Kategori AI
    AI: [
        ],

    //Kategori Downloader
    Downloader: [
        ],

    //Kategori Fun
    Fun: [
        { name: "Lahelu Random", path: "/api/fun?feature=lahelu", desc: "Meme random dari Lahelu" }
    ],

    //Kategori NSFW
    Nsfw: [
        { name: "Wangy NSFW", path: "/api/anime?feature=wangy", desc: "Gambar waifu wangy random" }
        ],

    //Kategori Tools
    Tools: [
        ]

};

app.get('/api/list', (req, res) => res.json(listFeatures));

app.get('/api/fun', async (req, res) => {
    const { feature, query, apikey } = req.query;
    if (apikey !== 'yusz123') return res.status(403).json({ status: false, msg: "Apikey Salah!" });

    try {
        if (feature === 'lahelu') return res.json(await handleLahelu());
        if (feature === 'bluearchive') return res.json(await handleBlueArchive(query));
        res.status(400).json({ status: false, msg: "Endpointnya ga ada" });
    app.get('/api/list', (req, res) => res.json(listFeatures));

app.get('/api/anime', async (req, res) => {
    const { feature, query, apikey } = req.query;
    if (apikey !== 'yusz123') return res.status(403).json({ status: false, msg: "Apikey Salah!" });

    try {
        switch (feature) {
            case 'euphy': return res.json(await features.handleEuphy());
            case 'jjcosplay': return res.json(await features.handleJjcosplay());
            case 'wangy': return res.json(await features.handleWangy());
            case 'livechart': 
                if (!query) return res.status(400).json({ msg: "Query wajib diisi!" });
                return res.json({ status: "success", author: "IyuszTempest", data: await features.handleLivechart(query) });
            case 'jikanmoe':
                if (!query) return res.status(400).json({ msg: "Query wajib diisi!" });
                return res.json({ status: "success", author: "IyuszTempest", data: await features.handleJikanmoe(query) });
            default: return res.status(400).json({ msg: "Fitur tidak ditemukan" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
});

module.exports = app;
