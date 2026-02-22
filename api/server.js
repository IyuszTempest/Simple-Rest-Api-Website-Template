// api/server.js
const express = require('express');
const app = express();
const { handleLahelu, handleBlueArchive } = require('./features');

app.use(express.json());

// DAFTAR MENU OTOMATIS
const listFeatures = {
    fun: [
        { name: "Lahelu Random", path: "/api/fun?feature=lahelu", desc: "Meme random dari Lahelu" },
        { name: "Blue Archive", path: "/api/fun?feature=bluearchive&query=", desc: "Data karakter Blue Archive" }
    ],
    // Nanti tinggal tambah kategori di sini, HTML bakal update sendiri!
};

app.get('/api/list', (req, res) => res.json(listFeatures));

app.get('/api/fun', async (req, res) => {
    const { feature, query, apikey } = req.query;
    if (apikey !== 'yusz123') return res.status(403).json({ status: false, msg: "Apikey Salah!" });

    try {
        if (feature === 'lahelu') return res.json(await handleLahelu());
        if (feature === 'bluearchive') return res.json(await handleBlueArchive(query));
        res.status(400).json({ status: false, msg: "Fitur tidak ada" });
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
});

module.exports = app;
