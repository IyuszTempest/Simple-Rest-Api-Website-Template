// api/server.js
const express = require('express');
const app = express();
const features = require('./features'); // Mengambil semua fungsi dari features.js

app.use(express.json());

// --- DAFTAR MENU OTOMATIS ---
// Dashboard HTML akan otomatis membaca list ini
const listFeatures = {
    Anime: [
        { name: "Euphy Random", path: "/api/anime?feature=euphy", desc: "Gambar Euphylia Magenta random" },
        { name: "JJ Cosplay", path: "/api/anime?feature=jjcosplay", desc: "Video cosplay random" },
        { name: "Livechart Search", path: "/api/anime?feature=livechart&query=", desc: "Cari anime di Livechart.me" },
        { name: "Jikan Moe", path: "/api/anime?feature=jikanmoe&query=", desc: "Cari anime via Jikan API" },
        { name: "Elaina", path: "/api/anime/elaina", desc: "Random Image Elaina" },
        { name: "Kurumi", path: "/api/anime/kurumi", desc: "Random Image Tokisaki Kurumi" },
        { name: "Megumin", path: "/api/anime/megumin", desc: "Random Image Megumin" },
        { name: "Sagiri", path: "/api/anime/sagiri", desc: "Random Image Izumi Sagiri" },
        { name: "Itachi", path: "/api/anime/itachi", desc: "Random Image Uchiha Itachi" },
        { name: "Mikey", path: "/api/anime/mikey", desc: "Random Image Manjiro Sano" },
        { name: "Keneki", path: "/api/anime/keneki", desc: "Random Image Kaneki Ken" },
        { name: "Random Loli", path: "/api/anime/loli", desc: "Random Image Loli" },
        { name: "Random Neko", path: "/api/anime/nekonime", desc: "Random Image Neko Anime" },
        { name: "Madara", path: "/api/anime/madara", desc: "Uchiha Madara Wallpaper" },
        { name: "Minato", path: "/api/anime/minato", desc: "Namikaze Minato Wallpaper" },
        { name: "Kakashi", path: "/api/anime/kakasih", desc: "Hatake Kakashi Wallpaper" },
        { name: "Tsunade", path: "/api/anime/tsunade", desc: "Tsunade Senju Wallpaper" },
        { name: "Asuna", path: "/api/anime/asuna", desc: "Yuuki Asuna (SAO)" },
        { name: "Emilia", path: "/api/anime/emilia", desc: "Emilia (Re:Zero)" },
        { name: "Yumeko", path: "/api/anime/yumeko", desc: "Jabami Yumeko (Kakegurui)" },
        { name: "Inori", path: "/api/anime/inori", desc: "Yuzuriha Inori" },
        { name: "Doraemon", path: "/api/anime/doraemon?apikey=", desc: "Random Image Doraemon" },
        { name: "Pokemon", path: "/api/anime/pokemon?apikey=", desc: "Random Image Pokemon" },
        { name: "Neko 2", path: "/api/anime/neko2?apikey=", desc: "Random Image Neko Anime v2" }
    ],
    AI: [
        { name: "AiLabs Image/Video", path: "/api/ai?feature=ailabs&query=&type=image", desc: "Generate Image atau Video dari Teks" },
        { name: "Creart AI", path: "/api/ai?feature=creart&query=", desc: "High Quality AI Image Generator" },
        { name: "Create Prompt", path: "/api/ai?feature=createprompt&query=", desc: "Buat prompt gambar yang detail secara otomatis" },
        { name: "DeepImage (Flux)", path: "/api/ai?feature=deepimg&query=&style=realistic", desc: "Generate gambar HD dengan style (Flux-1-Dev)" },
        { name: "Live3D AI", path: "/api/ai?feature=live3d&query=&style=Anime", desc: "AI Image Generator (Support NSFW)" },
        { name: "Photo to Anime", path: "/api/ai?feature=f2anime", desc: "Ubah foto wajah menjadi karakter anime" }
    ],
    Downloader: [
        { name: "AIO Downloader (IG/FB/TT)", path: "/api/download?feature=aio&url=", desc: "Download media dari berbagai sosial media" },
        { name: "TikTok Downloader", path: "/api/download?feature=tiktok&url=", desc: "Download Video (No WM) atau Slide Foto TikTok" },
        { name: "YouTube MP3", path: "/api/download?feature=ytmp3&url=", desc: "Download lagu dari YouTube" }
    ],
    Fun: [
        { name: "Lahelu Random", path: "/api/fun?feature=lahelu", desc: "Meme random dari Lahelu" }
    ],
    Nsfw: [
        { name: "Wangy NSFW", path: "/api/nsfw?feature=wangy", desc: "Gambar waifu wangy random" }
    ],
    Tools: [
        { name: "Preset AM", path: "/api/tools?feature=presetam", desc: "Kumpulan link preset AM random (XML/MB)" },
        { name: "Sub4Unlock Skip", path: "/api/tools?feature=sub4unlock&query=", desc: "Lewati link sub4unlock secara instan" },
        { name: "Happymod Search", path: "/api/tools/happymod?query=", desc: "Cari aplikasi modifikasi di Happymod" }
    ]
};


// --- MIDDLEWARE KEAMANAN ---
// Fungsi ini otomatis mengecek Apikey untuk semua endpoint /api/*
const checkApikey = (req, res, next) => {
    const { apikey } = req.query;
    if (apikey === 'yusz123') return next(); // Lanjut jika benar
    res.status(403).json({ status: false, msg: "Apikey Salah atau Tidak Ada!" });
};



// --- ENDPOINT LIST ---
app.get('/api/list', (req, res) => res.json(listFeatures));

// --- CATEGORY: ANIME ---
// --- Endpoint Anime dengan Query Parameter (?feature=) ---
app.get('/api/anime', checkApikey, async (req, res) => {
    const { feature, query } = req.query;
    try {
        switch (feature) {
            case 'euphy': return res.json(await features.handleEuphy());
            case 'jjcosplay': return res.json(await features.handleJjcosplay());
            case 'livechart': 
                if (!query) return res.status(400).json({ msg: "Query wajib diisi!" });
                return res.json({ status: "success", author: "IyuszTempest", data: await features.handleLivechart(query) });
            case 'jikanmoe':
                if (!query) return res.status(400).json({ msg: "Query wajib diisi!" });
                return res.json({ status: "success", author: "IyuszTempest", data: await features.handleJikanmoe(query) });
            default: return res.status(400).json({ status: false, msg: "Endpoint Anime tidak ditemukan" });
        }
    } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
});

// --- Endpoint Anime Jalur Langsung (/api/anime/:char) ---
const animeChars = [
    'elaina', 'kurumi', 'megumin', 'sagiri', 'itachi', 'mikey', 'keneki', 
    'loli', 'nekonime', 'madara', 'minato', 'kakasih', 'tsunade', 'asuna', 
    'emilia', 'yumeko', 'inori', 'doraemon', 'pokemon', 'neko2'
];

animeChars.forEach(char => {
    app.get(`/api/anime/${char}`, checkApikey, async (req, res) => {
        try {
            const functionName = `handle${char.charAt(0).toUpperCase() + char.slice(1)}`;
            
            if (typeof features[functionName] !== 'function') {
                return res.status(500).json({ status: false, msg: `Fungsi ${functionName} belum dibuat di features.js` });
            }

            const imageUrl = await features[functionName]();
            res.json({ 
                status: true, 
                author: "IyuszTempest", 
                character: char,
                result: imageUrl 
            });
        } catch (e) {
            res.status(500).json({ status: false, msg: e.message });
        }
    });
});

// --- CATEGORY AI ---
app.get('/api/ai', checkApikey, async (req, res) => {
    const { feature, query, type, style } = req.query;
    try {
        switch (feature) {
            case 'ailabs':
                if (!query) return res.status(400).json({ msg: "Prompt wajib diisi!" });
                return res.json(await features.handleAiLabs(query, type || 'image'));
            case 'creart':
                if (!query) return res.status(400).json({ msg: "Prompt wajib diisi!" });
                return res.json(await features.handleCreart(query));
            case 'createprompt':
                if (!query) return res.status(400).json({ msg: "Prompt wajib diisi!" });
                return res.json(await features.handleCreatePrompt(query));
            case 'deepimg':
                if (!query) return res.status(400).json({ msg: "Prompt wajib diisi!" });
                return res.json(await features.handleDeepImg(query, style || 'realistic'));
            case 'live3d':
                if (!query) return res.status(400).json({ msg: "Masukkan prompt gambar!" });
                return res.json(await features.handleLive3D(query, style || 'Anime'));
            case 'f2anime':
                if (!query) return res.status(400).json({ msg: "Masukkan URL gambar di parameter query!" });
                return res.json(await features.handleF2AnimeFromUrl(query));
            default: 
                return res.status(400).json({ status: false, msg: "Feature AI tidak ditemukan" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
});

// --- CATEGORY DOWNLOADER ---
app.get('/api/download', checkApikey, async (req, res) => {
    const { feature, url } = req.query;
    try {
        switch (feature) {
            case 'aio':
                if (!url) return res.status(400).json({ msg: "Mana link-nya, masbro?" });
                const result = await features.handleAio(url);
                return res.json(result);
            case 'tiktok':
                if (!url) return res.status(400).json({ msg: "Link TikTok-nya mana Senpai?" });
                return res.json(await features.handleTikTok(url));
            case 'ytmp3':
                if (!url) return res.status(400).json({ msg: "Masukkan link YouTube-nya!" });
                return res.json(await features.handleYtmp3(url));
            default:
                return res.status(400).json({ status: false, msg: "Feature Downloader tidak ditemukan" });
        }
    } catch (e) {
        res.status(500).json({ status: false, msg: e.message });
    }
});

// --- CATEGORY: FUN ---
app.get('/api/fun', checkApikey, async (req, res) => {
    const { feature } = req.query;
    try {
        switch (feature) {
            case 'lahelu': return res.json(await features.handleLahelu());
            default: return res.status(400).json({ status: false, msg: "Feature Fun tidak ditemukan" });
        }
    } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
});

// --- CATEGORY: NSFW ---
app.get('/api/nsfw', checkApikey, async (req, res) => {
    const { feature } = req.query;
    try {
        switch (feature) {
            case 'wangy': return res.json(await features.handleWangy());
            default: return res.status(400).json({ status: false, msg: "Endpoint NSFW tidak ditemukan" });
        }
    } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
});

// --- CATEGORY: TOOLS ---
app.get('/api/tools', checkApikey, async (req, res) => {
    const { feature, query } = req.query; 
    try {
        switch (feature) {
            case 'presetam': 
                return res.json(await features.handlePresetAM());
            
            case 'sub4unlock':
                if (!query) return res.status(400).json({ msg: "Masukkan link sub4unlock!" });
                return res.json(await features.handleSub4Unlock(query));
            
            case 'happymod':
                if (!query) return res.status(400).json({ msg: "Keyword pencarian wajib diisi!" });
                // Pastikan handleHappymod sudah di-export di features.js
                return res.json(await features.handleHappymod(query));

            default: 
                return res.status(400).json({ status: false, msg: "Feature Tools tidak ditemukan" });
        }
    } catch (e) { 
        res.status(500).json({ status: false, msg: e.message }); 
    }
});


let features;
try {
    features = require('./features');
} catch (e) {
    console.error("Critical Error di features.js:", e.message);
    features = {}; // Biar server nggak mati, tapi fitur emang bakal off sementara
}

// Export untuk Vercel
module.exports = app;
