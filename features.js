const axios = require('axios');
const cheerio = require('cheerio');

// Fungsi Scraper Anime (Contoh: Otakudesu)
const scrapeAnime = async () => {
    try {
        const { data } = await axios.get('https://otakudesu.cloud/venz/');
        const $ = cheerio.load(data);
        const anime = [];
        $('.venz ul li').each((i, el) => {
            anime.push({
                title: $(el).find('h2').text().trim(),
                status: $(el).find('.epz').text().trim(),
                link: $(el).find('a').attr('href')
            });
        });
        return anime;
    } catch (e) {
        return { error: "Gagal ambil data anime" };
    }
};

// Fungsi AI Simpel (Contoh: Simsimi atau API lain)
const chatAI = async (query) => {
    return { response: `Euphy menjawab: Kamu tadi tanya "${query}" ya?` };
};

module.exports = { scrapeAnime, chatAI };
