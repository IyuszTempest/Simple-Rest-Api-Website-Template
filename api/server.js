// api/server.js
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// --- PROTEKSI REQUIRE (AGAR DASHBOARD TIDAK MATI) ---
let features;
try {
    features = require('./features');
} catch (e) {
    console.error("EROR FATAL DI FEATURES.JS:", e.message);
    features = {}; // Fallback agar route /api/list tetap bisa diakses
}

// --- DAFTAR MENU ---
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
        { name: "AIO Downloader", path: "/api/download?feature=aio&url=", desc: "Download media dari berbagai sosial media" },
        { name: "TikTok Downloader", path: "/api/download?feature=tiktok&url=", desc: "Download Video (No WM) atau Slide Foto TikTok" },
        { name: "YouTube MP3V2", path: "/api/download?feature=ytmp3v2&url=", desc: "Download lagu dari YouTube" },
        { name: "YouTube MP3", path: "/api/download?feature=ytmp3&url=", desc: "Convert YouTube ke Audio" },
        { name: "YouTube MP4", path: "/api/download?feature=ytmp4&url=", desc: "Convert YouTube ke Video" },
        { name: "Play Music", path: "/api/download?feature=play&query=", desc: "Cari & Download Musik" },
        { name: "Play Video", path: "/api/download?feature=playvideo&query=", desc: "Cari & Download Video" },
        { name: "Youtube Search", path: "/api/download?feature=youtubesearch&query=", desc: "Youtube Search" }  
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
        { name: "Happymod Search", path: "/api/tools?feature=happymod&query=", desc: "Cari aplikasi modifikasi di Happymod" }
    ]
};

// --- MIDDLEWARE ---
const checkApikey = (req, res, next) => {
    const { apikey } = req.query;
    if (apikey === 'yusz123') return next();
    res.status(403).json({ status: false, msg: "Apikey Salah atau Tidak Ada!" });
};

// --- ENDPOINTS ---
app.get('/api/list', (req, res) => res.json(listFeatures));

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
            default: return res.status(400).json({ status: false, msg: "Endpoint tidak ditemukan" });
        }
    } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
});

const animeChars = ['elaina', 'kurumi', 'megumin', 'sagiri', 'itachi', 'mikey', 'keneki', 'loli', 'nekonime', 'madara', 'minato', 'kakasih', 'tsunade', 'asuna', 'emilia', 'yumeko', 'inori', 'doraemon', 'pokemon', 'neko2'];
animeChars.forEach(char => {
    app.get(`/api/anime/${char}`, checkApikey, async (req, res) => {
        try {
            const functionName = `handle${char.charAt(0).toUpperCase() + char.slice(1)}`;
            res.json({ status: true, author: "IyuszTempest", character: char, result: await features[functionName]() });
        } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
    });
});

app.get('/api/ai', checkApikey, async (req, res) => {
    const { feature, query, type, style } = req.query;
    try {
        switch (feature) {
            case 'ailabs': return res.json(await features.handleAiLabs(query, type || 'image'));
            case 'creart': return res.json(await features.handleCreart(query));
            case 'createprompt': return res.json(await features.handleCreatePrompt(query));
            case 'deepimg': return res.json(await features.handleDeepImg(query, style || 'realistic'));
            case 'live3d': return res.json(await features.handleLive3D(query, style || 'Anime'));
            case 'f2anime': return res.json(await features.handleF2AnimeFromUrl(query));
            default: return res.status(400).json({ status: false, msg: "Feature AI tidak ditemukan" });
        }
    } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
});

app.get('/api/download', checkApikey, async (req, res) => {
    const { feature, url } = req.query;
    try {
        switch (feature) {
            case 'aio': return res.json(await features.handleAio(url));
            case 'tiktok': return res.json(await features.handleTikTok(url));
            case 'ytmp3V2': return res.json(await features.handleYtmp3V2(url));
            case 'ytmp3': return res.json(await features.handleYtmp3(url));
            case 'ytmp4': 
                if (!url) return res.status(400).json({ msg: "Link mana?" }); 
                return res.json(await features.handleYtmp4(url));
            case 'play':
                if (!query) return res.status(400).json({ msg: "Mau cari lagu apa?" });
                return res.json(await features.handlePlay(query));
            case 'playvideo':
                if (!query) return res.status(400).json({ msg: "Mau cari video apa?" });
                return res.json(await features.handlePlayVideo(query));
            case 'ytsearch':
                if (!query) return res.status(400).json({ msg: "Mau cari video apa?" });
                return res.json({ status: true, author: "IyuszTempest", result: await features.handleYtSearchList(query) });
            default: return res.status(400).json({ status: false, msg: "Feature Downloader tidak ditemukan" });
        }
    } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
});

app.get('/api/fun', checkApikey, async (req, res) => {
    const { feature } = req.query;
    try {
        switch (feature) {
            case 'lahelu': return res.json(await features.handleLahelu());
            default: return res.status(400).json({ status: false, msg: "Feature Fun tidak ditemukan" });
        }
    } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
});

app.get('/api/nsfw', checkApikey, async (req, res) => {
    const { feature } = req.query;
    try {
        switch (feature) {
            case 'wangy': return res.json(await features.handleWangy());
            default: return res.status(400).json({ status: false, msg: "Endpoint NSFW tidak ditemukan" });
        }
    } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
});

app.get('/api/tools', checkApikey, async (req, res) => {
    const { feature, query } = req.query; 
    try {
        switch (feature) {
            case 'presetam': return res.json(await features.handlePresetAM());
            case 'sub4unlock': return res.json(await features.handleSub4Unlock(query));
            case 'happymod': return res.json(await features.handleHappymod(query));
            default: return res.status(400).json({ status: false, msg: "Feature Tools tidak ditemukan" });
        }
    } catch (e) { res.status(500).json({ status: false, msg: e.message }); }
});

module.exports = app;
        
