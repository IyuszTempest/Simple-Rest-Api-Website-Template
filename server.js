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
try {
        switch (feature) {
            case 'lahelu':
                const resultLahelu = await handleLahelu();
                return res.status(200).json(resultLahelu);
            
            case 'bluearchive':
                const resultBA = await handleBlueArchive(query);
                return res.status(200).json(resultBA);
            
            default:
                res.status(400).json({
                    status: 'error',
                    message: "Pilih feature: lahelu atau bluearchive"
                });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server running di https://iyusztempest.my.id`);
});
