// api/features.js
const axios = require('axios');
const cheerio = require('cheerio');

// --- DATABASE (JJ, Wangy, Euphy) ---
const jjcosplayVideoUrls = [ 
    "https://files.catbox.moe/id50en.mp4",
    "https://files.catbox.moe/b7gzby.mp4",
    "https://files.catbox.moe/mx2o68.mp4",
    "https://files.catbox.moe/tph815.mp4",
    "https://files.catbox.moe/i8tigq.mp4",
    "https://files.catbox.moe/pk3jsu.mp4",
    "https://files.catbox.moe/6yx8u3.mp4",
    "https://files.catbox.moe/es6zxo.mp4",
    "https://files.catbox.moe/brca5i.mp4",
    "https://files.catbox.moe/hukaxy.mp4",
    "https://files.catbox.moe/xwiy7d.mp4",
    "https://files.catbox.moe/p7y9f7.mp4",
    "https://files.catbox.moe/jr3xhl.mp4",
    "https://files.catbox.moe/0lpyi0.mp4",
    "https://files.catbox.moe/z8k3kh.mp4",
    "https://files.catbox.moe/lift7v.mp4",
    "https://files.catbox.moe/030p0f.mp4",
    "https://files.catbox.moe/lohm7e.mp4",
    "https://files.catbox.moe/ziq8ga.mp4",
    "https://files.catbox.moe/mit2l3.mp4",
    "https://files.catbox.moe/neb6no.mp4",
    "https://files.catbox.moe/3eg5uz.mp4",
    "https://files.catbox.moe/erh5h9.mp4",
    "https://files.catbox.moe/rc0vxb.mp4"];
const wangyImageUrls = [
    "https://files.catbox.moe/4r4b5b.jpg",
    "https://files.catbox.moe/r577fm.jpg", 
    "https://files.catbox.moe/cn6sll.jpg", 
    "https://file.idnet.my.id/api/preview.php?file=k0gxc9cn.jpg", 
    "https://files.catbox.moe/fjt3w0.jpg", 
    "https://files.catbox.moe/4kz020.jpg", 
    "https://files.catbox.moe/9h7xig.jpg", 
    "https://files.catbox.moe/nx0vzk.jpg", 
    "https://files.catbox.moe/n3n4wq.jpg", 
    "https://files.catbox.moe/rdgj0i.jpg", 
    "https://files.catbox.moe/xa8sch.jpg", 
    "https://files.catbox.moe/auxhu5.jpg", 
    "https://files.catbox.moe/e204yn.jpg", 
    "https://files.catbox.moe/y8ycc1.jpg", 
    "https://files.catbox.moe/n1z0u1.jpg", 
    "https://files.catbox.moe/sqony1.jpg", 
    "https://files.catbox.moe/dvqqab.jpg",
    "https://files.catbox.moe/yfuw9e.jpg", 
    "https://files.catbox.moe/ws10zf.jpg", 
    "https://files.catbox.moe/olgr7x.jpg", 
    "https://files.catbox.moe/8xgawu.jpg", 
    "https://files.catbox.moe/ncapdx.jpg", 
    "https://files.catbox.moe/dr2sn6.jpg", 
    "https://file.idnet.my.id/api/preview.php?file=wx5fn06x.jpg", 
    "https://files.catbox.moe/dxqa0m.jpg", 
    "https://files.catbox.moe/f85izz.jpg", 
    "https://files.catbox.moe/x2kjb8.jpg", 
    "https://files.catbox.moe/4igub5.jpg", 
    "https://files.catbox.moe/g09bwa.jpg", 
    "https://files.catbox.moe/bpm0i5.jpg", 
    "https://files.catbox.moe/6s474c.jpg", 
    "https://files.catbox.moe/aqsarb.jpg", 
    "https://files.catbox.moe/0mi33i.jpg", 
    "https://files.catbox.moe/s36vhv.jpg", 
    "https://files.catbox.moe/e0x2j2.jpg", 
    "https://o.uguu.se/vanOQjUd.jpg", 
    "https://n.uguu.se/lJZUGqWv.jpg", 
    "https://d.uguu.se/sOYgQZKg.jpg", 
    "https://h.uguu.se/GgHHkdUP.jpg", 
    "https://h.uguu.se/dhAmdSxK.jpg", 
    "https://o.uguu.se/LTJoZAii.jpg", 
    "https://o.uguu.se/ZyhtoeBw.jpg", 
    "https://files.catbox.moe/m5bsd3.jpg", 
    "https://files.catbox.moe/rc0206.jpg", 
    "https://files.catbox.moe/v7bkyf.jpg", 
    "https://files.catbox.moe/w0swoa.jpg", 
    "https://files.catbox.moe/400naj.jpg", 
    "https://files.catbox.moe/21rwm8.jpg", 
    "https://files.catbox.moe/pgqv6q.jpg", 
    "https://files.catbox.moe/xltpyr.jpg", 
    "https://files.catbox.moe/cikrhx.jpg", 
    "https://files.catbox.moe/uab555.jpg", 
    "https://files.catbox.moe/kavl4u.jpg", 
    "https://files.catbox.moe/brakjh.jpg", 
    "https://files.catbox.moe/inu9yt.jpg", 
    "https://files.catbox.moe/ayjovk.jpg", 
    "https://files.catbox.moe/30c7a8.jpg", 
    "https://files.catbox.moe/q6nmft.jpg", 
    "https://files.catbox.moe/68sp8c.jpg", 
    "https://files.catbox.moe/jovb5t.jpg", 
    "https://files.catbox.moe/fa3y4v.jpg", 
    "https://files.catbox.moe/9c87so.jpg", 
    "https://files.catbox.moe/pkq4wf.jpg", 
    "https://files.catbox.moe/wdfwzp.jpg", 
    "https://files.catbox.moe/czt87z.jpg", 
    "https://files.catbox.moe/d62y14.jpg", 
    "https://files.catbox.moe/dqlzqc.jpg", 
    "https://files.catbox.moe/ywydrl.jpg", 
    "https://files.catbox.moe/3nxzgy.jpg", 
    "https://files.catbox.moe/lpxtwv.jpg", 
    "https://files.catbox.moe/o5sdsw.jpg", 
    "https://files.catbox.moe/eck1ls.jpg", 
    "https://files.catbox.moe/yjx8cb.jpg", 
    "https://files.catbox.moe/tyh1zp.jpg", 
    "https://files.catbox.moe/ul44qg.jpg", 
    "https://files.catbox.moe/lqn6hr.jpg", 
    "https://files.catbox.moe/qrp5ny.jpg", 
    "https://files.catbox.moe/flcb6w.jpg", 
    "https://files.catbox.moe/52rlq0.jpg", 
    "https://files.catbox.moe/np0tcw.jpg", 
    "https://files.catbox.moe/2ysfz9.jpg", 
    "https://files.catbox.moe/x1klu6.jpg", 
    "https://files.catbox.moe/ve91cd.jpg", 
    "https://files.catbox.moe/a4tw9j.jpg", 
    "https://files.catbox.moe/b5ptq1.jpg", 
    "https://files.catbox.moe/k051g5.jpg", 
    "https://files.catbox.moe/71b6dc.jpg", 
    "https://files.catbox.moe/viwj5r.jpg", 
    "https://files.catbox.moe/btn4zz.jpg",];
const euphyImageUrls = [
    "https://file.idnet.my.id/api/preview.php?file=5nw6c8du.jpg",
    "https://file.idnet.my.id/api/preview.php?file=4l7ypeso.jpg",
    "https://file.idnet.my.id/api/preview.php?file=ost7x2nv.jpg",
    "https://file.idnet.my.id/api/preview.php?file=xxdsfoz3.jpg",
    "https://file.idnet.my.id/api/preview.php?file=mdg0915g.jpg",
    "https://file.idnet.my.id/api/preview.php?file=0z4yfn8v.jpg",
    "https://file.idnet.my.id/api/preview.php?file=nbpjhqb8.jpg",
    "https://file.idnet.my.id/api/preview.php?file=rit8j60t.jpg",
    "https://file.idnet.my.id/api/preview.php?file=j4t1pay9.jpg",
    "https://file.idnet.my.id/api/preview.php?file=lv8tdwfu.jpg",
    "https://file.idnet.my.id/api/preview.php?file=p461z38p.jpg",
    "https://file.idnet.my.id/api/preview.php?file=biwbo3r0.jpg",
    "https://file.idnet.my.id/api/preview.php?file=v864vsp0.jpg",
    "https://file.idnet.my.id/api/preview.php?file=puaiorav.jpg",
    "https://file.idnet.my.id/api/preview.php?file=gaj3rt1y.jpg",
    "https://file.idnet.my.id/api/preview.php?file=q4ezft9i.jpg",
    "https://file.idnet.my.id/api/preview.php?file=xvjd2k6t.jpg",
    "https://file.idnet.my.id/api/preview.php?file=32523n5n.jpg",
    "https://file.idnet.my.id/api/preview.php?file=2oc1ux0b.jpg",
    "https://file.idnet.my.id/api/preview.php?file=db7ghpei.jpg",
    "https://file.idnet.my.id/api/preview.php?file=w2qc5w0o.jpg",
    "https://file.idnet.my.id/api/preview.php?file=67j6zogo.jpg",
    "https://file.idnet.my.id/api/preview.php?file=f4nxrbx6.jpg",
    "https://file.idnet.my.id/api/preview.php?file=xbvhbd6j.jpg",
    "https://file.idnet.my.id/api/preview.php?file=tqptfwre.jpg",
    "https://file.idnet.my.id/api/preview.php?file=6llqhtdt.jpg",
    "https://file.idnet.my.id/api/preview.php?file=fjd4tzg8.jpg",
    "https://file.idnet.my.id/api/preview.php?file=dms1c3am.jpg",
    "https://file.idnet.my.id/api/preview.php?file=uu6awqf7.jpg",
    "https://file.idnet.my.id/api/preview.php?file=jvjqkzli.jpg",
    "https://file.idnet.my.id/api/preview.php?file=fsi2kxi2.jpg",
    "https://file.idnet.my.id/api/preview.php?file=mm9vnesq.jpg",
    "https://file.idnet.my.id/api/preview.php?file=8yqp87d1.jpg",
    "https://file.idnet.my.id/api/preview.php?file=4n111fhk.jpg",
    "https://file.idnet.my.id/api/preview.php?file=p71vpie4.jpg",
    "https://file.idnet.my.id/api/preview.php?file=cw1hlhqo.jpg",
    "https://file.idnet.my.id/api/preview.php?file=5rvjpneb.jpg",
    "https://file.idnet.my.id/api/preview.php?file=dxsdatez.jpg"];

// Fungsi Scraper Lahelu
const handleLahelu = async () => {
    try {
        const randomCursor = Math.floor(Math.random() * 50) + 1;
        const laheluApiUrl = `https://lahelu.com/api/post/get-recommendations?field=5&cursor=${randomCursor}`;
        const response = await fetch(laheluApiUrl);
        const data = await response.json();

        const postsWithMedia = data.postInfos.filter(post =>
            post.content && post.content.some(item => item.type === 1 || item.type === 4)
        );

        if (postsWithMedia.length === 0) {
            throw new Error("Tidak ada media ditemukan");
        }

        const randomIndex = Math.floor(Math.random() * postsWithMedia.length);
        const randomPost = postsWithMedia[randomIndex];

        const title = randomPost.title;
        const mediaItem = randomPost.content.find(item => item.type === 1 || item.type === 4);
        
        return {
            status: "Sukses Kak!",
            message: title,
            author: "IyuszTempest",
            media: {
                type: "video",
                url: mediaItem.value
            }
        };
    } catch (error) {
        throw error;
    }
};

const handleJjcosplay = async () => {
    const randomUrl = jjcosplayVideoUrls[Math.floor(Math.random() * jjcosplayVideoUrls.length)];
    return { status: "success", author: "IyuszTempest", media: { type: "video", url: randomUrl } };
};

const handleWangy = async () => {
    const randomUrl = wangyImageUrls[Math.floor(Math.random() * wangyImageUrls.length)];
    return { status: "success", author: "IyuszTempest", media: { type: "image", url: randomUrl } };
};

const handleEuphy = async () => {
    const randomUrl = euphyImageUrls[Math.floor(Math.random() * euphyImageUrls.length)];
    return { status: "success", author: "IyuszTempest", media: { type: "image", url: randomUrl } };
};

const handleLivechart = async (query) => {
    const url = `https://www.livechart.me/search?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(data);
    
    return $('.anime-list .anime-item').map((_, el) => ({
        title: $(el).find('.anime-item_body_title strong a').text().trim(),
        link: 'https://www.livechart.me' + $(el).find('.anime-item_body_title strong a').attr('href'),
        image: $(el).find('.anime-item__poster-wrap img').attr('src'),
        rating: $(el).find('.info .icon-star').parent().text().trim() || 'N/A'
    })).get();
};

const handleJikanmoe = async (query) => {
    const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`);
    return res.data.data;
};

// EXPORT SEMUA FUNGSI
module.exports = { 
    handleJjcosplay, 
    handleWangy, 
    handleEuphy, 
    handleLivechart, 
    handleJikanmoe,
    handleLahelu
};
