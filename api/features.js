// api/features.js
const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
const ws = require('ws');
const { Readable } = require('stream');

// --- DATABASE---
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
    "https://files.catbox.moe/btn4zz.jpg"];

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

const presetsAM = [ 
    {UrlMb: 'https://alight.link/DkMZVF4nRRR3x3836', UrlXml: 'https://drive.google.com/file/d/1QkKltiQxMsjNDkoKCsoNMtkEj8MlQOzR/view?usp=drivesdk',Sound: 'https://drive.google.com/file/d/1QvYFwPzZ_HBqbDNdElTSqeXA5C17YOJ2/view?usp=drivesdk'},
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1cV83fK5_afiB5P5-Y6kuky_Gn2fbRaDj/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1dxQxx3Vtk1hdDthyiwmx_BkeIdGcAD4e/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1eObZsSxmTkC1cCiBmtxTB9NmWHHLB66i/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1exWyGrWdc4i03bT8Rc2NCm-4feuLmh6u/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1faBdZwgG3JK9VladABNhPTYRkbGtBM58/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1xoKFz_QLf3lsWrzMZROtDKJrOo-cijtD/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1xyMpkeypEv6o6W9V-wvNNNEwyOci7_RL/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1kS8RI123T2hJOrm1LWbqNroWgXUtd5QL/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1moLhSZM6FPyGm9nyV7fDbvSv_xqIVwNP/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1y8py0ImGJ5xsWewO0WMflQTFGv8SxKHu/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1yKBNmwBfVXtBfXq-XJPJz__q4ZyfLN1e/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1yRmC66V22gkKelm0DNdNMPqvoWYPB-Ct/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1pcryzHXhLOX3QYHsiuTjYc4JDZgs1XQI/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1tTXgc-QDLYt_9sK3LrUNYfaGkVp9lDKy/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1u2V9wQhFeJRv-eqWf-LZB5BF7eXi_a-q/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1yTuFXERF_F_uDJqC2GHW2yboHI2yI1Ur/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1yci1nJiJKRmjIlPyjPmeut5aGvoM9VcL/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1vhSrONcUHYFxriqceBmkvwlOZkR5eSum/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/XRLz1TimNE7fYrfw8', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://www.mediafire.com/file/ob10a4qykwy6ypp/led_calculator.zip/file', Sound: '-' },
            { UrlMb: 'https://alight.link/Awj31G9wjmQp3Pkt5', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/14wR6I0qRtTRy7ppOEMsje5HW9HyoXvPJ/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/158aIUL3BZWS2wnDJcYsYFhmamuyynExs/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/16lsXzTSOYvgqf2A9VyD5SvKQWNa7IRDM/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/SfNkbYLpPdvLbV2B7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/c5f1dLpVpQm5jruF9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/JZBB2o8GTfMtAYFG9', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/15RAJkgnjOBxrwKlJs1S-t93LFNhT-JTT/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/NxDMGoYpdVwsxbRf7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/oSvQTq98BWUin4yU6', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1BDVKCdiwwkB7-kCsm_v8NVgNrQOmVKp9/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1BIrAWO996Apd0aANOa7NrAAKA0i5EfUX/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/att2NaPxd5swmtae9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/Q8vN9YGRxgLCjWGN6', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1Ftjprho6lHwLkShveh71zxncLC2jYxUO/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1HK-AhrwV2f_oTbuNOZn6FagfNDPls3cJ/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/A8NMLyaNPdeb2rXw6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/FHkeF7c37MsZ5uUx7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/iopbzi2keZg7nwka', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1JdN2CwezGaAS1NUanmbbO3ajJ5PYJWQq/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/YqkytdjS83SAbUKC7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/aJxjlZ84V1bgDOt2V3GJF0hgZh92/p/rW4SB8yyez-77ed56ae07f03e54?intro-snow', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/yvz1gchrtuLkxWMb6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/LZgk55PSWUjCKMPX7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/pVo5biGLMnueNJQb6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/2mzO7bv0VNV9gNcEbRm26LkCSsQ2/p/zcsaoVFIMm-3bd8a7fd6a5d3273', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/O5CLVawqayZc8YX7DO0VDpTOWFY2/p/1WuXeAFpEN-b3306cf4f501e485', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/oBRsH4rzJzgvkwYKSq5wjBpRVyq1/p/YrtG8HDeAJ-0b6a13e320bd157f?source=link', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/odvVtPb6U6V0MN4DY5IMlqu5lVq2/p/l7RKBoxJEw-d1b22389481e48a7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/2mzO7bv0VNV9gNcEbRm26LkCSsQ2/p/KS3I5zTInL-d61cdfb61e030fe9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/2mzO7bv0VNV9gNcEbRm26LkCSsQ2/p/IM2fTo2J0J-f0516d4ca8e943f7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/1ZEnCaJPbfykQdxz7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/Z2gQ3NRyZ3R8Jt2aqfWQGxxDcZf1/p/znRmjyiFzW-6a7b991ef7f65ad6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/z1ouBMfNtcg4SATnmJHmfN1S7dt2/p/BgBGNFnyFE-c7f0b0668dbc1b0f', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/ZvfRV3YNwchQIG3MgS2vQQeSItm2/p/8Op3v4wLJ8-8740c0f2b9972d20', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/4qrKPurrH9j5QRuTA', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1FDycTanD5OlgnPej8b2dYL9uRKc-iPNC/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/KVVkHGtVod8cABy97', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://www.mediafire.com/file/e8mv734tz0s5p9r/Proyek+Baru+58+[C58F6C1].png/file', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/wrBDQ30X0DMLcoSgz6xMQXwJ10S2/p/WClvZGtDJS-672a34c4e85c00ce', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/ZwKdUDm51YE2Z5cU8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/cfDrf1i8GFRAnFHK8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/LT3j5LwCuA4qUfMo7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/2gsxnJHudevPQkt88', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/jk2iEZaCFHcKMhty6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/ppH8x8gWNJF56LXe6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/VtdJwKDrHdNNgPSg6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/R8WEEqoWXyiY797V7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/ABUtnb1Dj9oXnMvb8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/MuwcQmKnjBYFx5GSA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/XFk8dEuQXexTKyBC6', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1-_EkltObxtC7H_2Qw5Oe9wzpX2uB8Jed/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1-Y94NIUfOGu3hJrcYqcn-CJY9HDwTrh5/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/oYPREC4sTVZcWrh97', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/HMCbcay2x3wqg884A', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/7g7k58iwEGDkdWeZ9', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/drive/folders/14KUAAqce4OGgoqH7ahEr7sqKeE4RF39m', Sound: '-' },
            { UrlMb: 'https://alight.link/adcdhtm1F9UCnMyL6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/h4WGevL1KBfSFyf69', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/5RnqNZUqMQ8zqNGF8', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/drive/folders/1rElQsgSRGUQwAXDwjlVEVc4gnWjNke1x', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1GThL4sFkTkCQ9Wfg5lo0fqtWgIeD7siL/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/VvVoHYM2oXmghvm87', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/AFAtNtiorvqJHs1d7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/7MHX6dhPK2KmtcgN7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/CC6KcjZWBcmxfum99', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/EAAZeEi4Xuj51BGy6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/n8shRmEDxXVdgCYj7', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1d42efb-9CXlNaGx4yZqHxfVR6RZNClMU/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/Lkz5eF1kcEjhVXLi8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/DZQP2AMktPKYW9r98', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/x1JXpJDwBbGzUkNr6', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1hGiW-8r02vhBY49GnUjUtjo_lJIhObt7/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/VpibRmB29QVbg986A', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/Tu6t45DsBk3bZU7g7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/FxEK9K18Xq4YxpaN9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/g5hhaMH5PgdggAdc7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/st1WudPwpifM9B9f6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/xCiantLvt7cReMQq8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/BTVZQDh8DonFZQrv9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/F3phKZ5bGZFbhHFL7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/X61rr7ChShhVxvBc6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/feQriwm1pxrwNfjEA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/yioW3CENCqXGhryM9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/9bFUvop111pznFDYA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/rFmiqqjNh8nmRUKg9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/9LN52aEA3hWxWSsS9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/beRZwdPchm4PbxNAA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/2SkbBL26xXw3e6mp7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/nePGCvCipTcjMu146', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/apvhWb9X6MhGhUr69', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/vQeKULAVpFXUhhLK8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/XRUB2wpELovfLLQr8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/2NntvdwzuTqEPbed9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/Y5MMReDqKbjj1ii89', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/2AwKCiWoAYizAQaFA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/zSt168BqhZ9uAoL88', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/PQ3moiVe158DTTZK9', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/drive/folders/12C6jkskb8TyZfN659on8qNLXN7FritNK', Sound: '-' },
            { UrlMb: 'https://alight.link/EZx2wygN5m8JMC9g7', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://www.mediafire.com/file/ini848stjknle71/Proyek_Baru_77%5BB7335B9%5D.mp4/file_', Sound: '-' },
            { UrlMb: 'https://alight.link/pBCS5P5WjReg9gsw8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/uK8q9h3bZkSeF2XY7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/dxnr1pHeRjPEsvuk9', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1IcampuZy77Ev_q2bSojZRaKWzD1Tdwn-/view', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1IcRWsWLcDygo9yASIufe5xcOs2LQrYpQ/view', Sound: '-' },
            { UrlMb: 'https://alight.link/HGjs1ZFifkFjEAiq5', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/sY1c88sK1s7Mgduv9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/mWAWTT9cA9GZWaLr8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/jXbpiZUYj6nWEeSX9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/uLAeJG5U41N3DJsx9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/dwS3CkeJAJVYFcwg8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/hNh7dxAoqfQcJ5zTA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/bix5GLU8EPXTYeXu8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/hkzmEsF84gBVrj369', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/dqyWbVM4RBzU1aba7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/Ncw9PPo2C4SGNdtr6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/qHmC86d4c3DwEcdz7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/AC3AJxWCktLeUPxz9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/jqdEAbdTjyDuZusz6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/h8DHjhctFYbH4gVX6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/F8bjQ29cfqzquo8B9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/G4J2iyvBoxTA8cGA8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/3YbLNkJ7pABAGgnQA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/CFhNFD6iUeMXPVof9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/1fHfvwWb3HizZiqNA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/2wscC5cBQq4Y1RVp8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/JXk6dY2SD3vuGPSq6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/cyyK6zUAo43Fjwdi9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/o3iq7mjySVCYmZEx8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/BdC93H2hFJE1EuX77', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/bRAFmNfNa1qvXzj7A', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/qP7C7x6JvrFsy3vT6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/WT6AqiVx5LLX8Nd56', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/oFebB2NqEvadhQ2M7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/DVbeDc1Z2vBD4tK99', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/1RNTztJTnCvFHGVR7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/bfPGHdan4B1bXJBC6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/iKu6SdcTzSc71Rpj9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/BuREsPcDyZqLkJRU9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/zK6oNQztAJFN9EBu8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/4zcVLF9zUdc348ax6?source=link', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/JJnuHhYMf91xXayZA?source=link', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/qVHZdwwu6Qpe2Bjz8?source=link', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/Lc13peYpgWY9CQBM7?source=link', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/MHkHWYDhes856SbX8?source=link', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/BehzRQ25dWt5z9ve9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/ctbWi5Su2ASbMNPS6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/9HwBeKqtxXozsYwt8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/8Qvi3v1bJwyHNY6N7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/27dJt4CEj7jUtPHY9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/iTZsy9PvSy5nEMAY7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/Ps6xxHPXvWgLXKVa6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/bf1YtRB3C7TC1zZe8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/MoQwCR2K8FG4zomu7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/yceqYf7N4UJgfGUt8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/8ddreXWxTA5oQ8sh9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/jDUXKYm8hUX9VDMn6', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/hQZKG3PKqkG4VgeN9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/ay4ncDNCJW1GfsbW9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/La7qK8JvEvrV8Bnp9?source=link', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1tvue5CA6dwba_ULXVTkpaCEZJGJMdJGQ/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1JM5SaWxqz95yDO3U9qmP_luBSwjauZFi/view?usp=drivesdk', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1OPP2UYnwoi3oJEhW3NnoLldW818L6Na-/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/PML4gYQgxLgeYfpCKcKR1sB5oSy1/p/SOd4SIrKj4-042b30f6b50a524c', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/1DRCrXApZkK5viRAyE6rzrVD2ZhtfOv-6/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alightcreative.com/am/share/u/NIteSbeCEoeSfH5aDuUFjLRSUE13/p/FRK7mHpqbU-e5bd913b971837c4', UrlXml: '-', Sound: '-' },
            { UrlMb: '-', UrlXml: 'https://drive.google.com/file/d/18uicba4SZno9amQ0mDF7TPthz63IdN1q/view?usp=drivesdk', Sound: '-' },
            { UrlMb: 'https://alight.link/wQA78JPnyrc1CcfF9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/K8eVNRBzRD4iN1QR9', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/hwDwnN3TfHS7aArY8', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/RWdxLfExXZzoHJVSA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/mqahAZUUp9GF8TJx7', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/iopbzi2keZg7nwkaA', UrlXml: '-', Sound: '-' },
            { UrlMb: 'https://alight.link/xxKnbdJx5p7GPjWo7', UrlXml: '-', Sound: '-' }
];

// --- Helper Translate ---
async function translateToEn(text) {
    try {
        const res = await axios.get("https://translate.googleapis.com/translate_a/single", {
            params: { client: "gtx", sl: "auto", tl: "en", dt: "t", q: text }
        });
        return res.data[0][0][0];
    } catch { return text; }
}

// --- Helper Pixnova ---
const getBaseHeaders = () => ({
    'authority': 'api.pixnova.ai',
    'accept': 'application/json, text/plain, */*',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzE5MTk5OTksInN1YiI6Imdvb2dsZSAyOTE1NjEgMTExOTc3YzBkNWRlZjY0NyBhZGl0d2lidWJhd2FuZ0BnbWFpbC5jb20ifQ.2nTe_x6ZkOXvs0FL1hogCCDgmKJ372u_AaHQ-HyHs0I',
    'fp': '0df2b908adc1538377106a60d0a4656a',
    'fp1': 'tnQlcNBWQ4ZZ8fT0hPFSumfrL269cd0nahljUlxTIU8/6IavPmKwooWAyRo4aiCj',
    'origin': 'https://pixnova.ai',
    'referer': 'https://pixnova.ai/',
    'theme-version': '83EmcUoQTUv50LhNx0VrdcK8rcGexcP35FcZDcpgWsAXEyO4xqL5shCY6sFIWB2Q',
    'x-code': '1771747333264',
    'x-guide': 'L2eSPTjjycakOw97x3LyJiq/IznnthQzrq3k6kN0WNC9lIE0BQtLpv/MEDKHg2GPZ/bkF3rGVV6BwO1ISOTNXkUJBro7QJdrqp8RgVvLQtKeoFkyh8j+M8q1+hkW6mKWVKstDnGPIxc7jQFT32OGhNJkbO4J6H5Wr6BFoWe0NQs=',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36'
});

// ENDPOINT SCRAPE

// ==========================================
// KATEGORI ANIME
// ==========================================
const handleJjcosplay = async () => {
    const randomUrl = jjcosplayVideoUrls[Math.floor(Math.random() * jjcosplayVideoUrls.length)];
    return { 
        status: "success", 
        author: "IyuszTempest", 
        media: { type: "video", url: randomUrl } 
    };
};

const handleEuphy = async () => {
    const randomUrl = euphyImageUrls[Math.floor(Math.random() * euphyImageUrls.length)];
    return { 
        status: "success", 
        author: "IyuszTempest", 
        media: { type: "image", url: randomUrl } 
    };
};

const handleLivechart = async (query) => {
    try {
        const url = `https://www.livechart.me/search?q=${encodeURIComponent(query)}`;
        const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(data);
        
        return $('.anime-list .anime-item').map((_, el) => ({
            title: $(el).find('.anime-item_body_title strong a').text().trim(),
            link: 'https://www.livechart.me' + $(el).find('.anime-item_body_title strong a').attr('href'),
            image: $(el).find('.anime-item__poster-wrap img').attr('src'),
            rating: $(el).find('.info .icon-star').parent().text().trim() || 'N/A'
        })).get();
    } catch (error) {
        throw new Error("Gagal mengambil data dari Livechart");
    }
};

const handleJikanmoe = async (query) => {
    try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`);
        return res.data.data;
    } catch (error) {
        throw new Error("Gagal mengambil data dari JikanMoe");
    }
};
// ==========================================
// KATEGORI AI
// ==========================================
const aiLabs = {
    api: {
        base: 'https://text2video.aritek.app',
        endpoints: { text2img: '/text2img', generate: '/txt2videov3', video: '/video' }
    },
    setup: {
        cipher: 'hbMcgZLlzvghRlLbPcTbCpfcQKM0PcU0zhPcTlOFMxBZ1oLmruzlVp9remPgi0QWP0QW',
        dec(text, shift) {
            return [...text].map(c =>
                /[a-z]/.test(c) ? String.fromCharCode((c.charCodeAt(0) - 97 - shift + 26) % 26 + 97) :
                /[A-Z]/.test(c) ? String.fromCharCode((c.charCodeAt(0) - 65 - shift + 26) % 26 + 65) : c
            ).join('');
        }
    },
    // Fungsi Generate Utama
    generate: async (prompt, type = 'image') => {
        const token = aiLabs.setup.dec(aiLabs.setup.cipher, 3);
        
        if (type === 'image') {
            const form = new FormData();
            form.append('prompt', prompt);
            form.append('token', token);
            const res = await axios.post(aiLabs.api.base + aiLabs.api.endpoints.text2img, form, {
                headers: { ...form.getHeaders(), 'user-agent': 'NB Android/1.0.0' }
            });
            return res.data;
        } else {
            // Logic Video (Simplified for API response)
            const payload = { deviceID: "euphy" + Math.random(), isPremium: 1, prompt, used: [], versionCode: 59 };
            const res = await axios.post(aiLabs.api.base + aiLabs.api.endpoints.generate, payload, {
                headers: { authorization: token, 'user-agent': 'NB Android/1.0.0' }
            });
            return res.data; // Mengembalikan key untuk dicek manual atau via bot
        }
    }
};

const handleCreart = async (prompt, imageBuffer = null) => {
    try {
        const translated = await translateToEn(prompt);
        const form = new FormData();
        form.append("prompt", translated);
        form.append("aspect_ratio", "4x5");
        form.append("guidance_scale", "9.5");
        form.append("controlnet_conditioning_scale", "0.5");

        let endpoint = "text2image";
        if (imageBuffer) {
            endpoint = "image2image";
            form.append("input_image_type", "image2image");
            form.append("image_file", imageBuffer, "image.png");
        } else {
            form.append("input_image_type", "text2image");
        }

        const response = await axios.post(`https://api.creartai.com/api/v2/${endpoint}`, form, {
            headers: form.getHeaders(),
            responseType: "arraybuffer"
        });

        // Kita balikkan dalam bentuk base64 agar aman di JSON
        return {
            status: "success",
            author: "IyuszTempest",
            result: Buffer.from(response.data).toString('base64')
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

const handleCreatePrompt = async (prompt) => {
    const payload = { content: prompt, op: 'op-prompt' };
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Origin': 'https://junia.ai',
        'Referer': 'https://junia.ai/',
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post('https://api-v1.junia.ai/api/free-tools/generate', payload, { headers });
        const result = response.data?.result || response.data;
        
        if (!result) throw new Error('API tidak memberikan respon');

        return {
            status: "success",
            author: "IyuszTempest",
            credit: "Scrape by NB Script",
            result: result
        };
    } catch (error) {
        throw new Error("Gagal membuat prompt AI");
    }
};

const handleDeepImg = async (prompt, style = 'realistic') => {
    const deviceId = `dev-${Math.floor(Math.random() * 1000000)}`;
    try {
        const response = await axios.post('https://api-preview.chatgot.io/api/v1/deepimg/flux-1-dev', {
            prompt: `${prompt} -style ${style.toLowerCase()}`,
            size: "1024x1024",
            device_id: deviceId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://deepimg.ai',
                'Referer': 'https://deepimg.ai/',
            }
        });

        if (response.data?.data?.images?.length > 0) {
            return {
                status: "success",
                author: "IyuszTempest",
                credit: "OwnBlox",
                result: {
                    url: response.data.data.images[0].url,
                    prompt: prompt,
                    style: style
                }
            };
        } else {
            throw new Error("Gagal mendapatkan gambar dari DeepImage.");
        }
    } catch (error) {
        throw new Error(error.message || "Terjadi kesalahan pada API DeepImage.");
    }
};

const handleLive3D = async (prompt, style = 'Anime') => {
    return new Promise((resolve, reject) => {
        try {
            const session_hash = Math.random().toString(36).substring(2);
            const socket = new ws('wss://app.yimeta.ai/ai-art-generator/queue/join');
            
            // Timeout agar tidak gantung di Vercel (Max 60 detik)
            const timer = setTimeout(() => {
                socket.close();
                reject(new Error('Live3D Timeout!'));
            }, 60000);

            socket.on('message', (data) => {
                const d = JSON.parse(data.toString('utf8'));
                if (d.msg === 'send_hash') {
                    socket.send(JSON.stringify({ fn_index: 31, session_hash }));
                } else if (d.msg === 'send_data') {
                    socket.send(JSON.stringify({
                        fn_index: 31,
                        session_hash,
                        data: [style, prompt, '', 7, ''] // Negative prompt dikosongkan/default
                    }));
                } else if (d.msg === 'process_completed') {
                    clearTimeout(timer);
                    socket.close();
                    if (d.output?.data?.[0]?.[0]?.name) {
                        resolve({
                            status: "success",
                            author: "IyuszTempest",
                            result: d.output.data[0][0].name // URL Gambar
                        });
                    } else {
                        reject(new Error('Data output tidak valid'));
                    }
                }
            });

            socket.on('error', (err) => {
                clearTimeout(timer);
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleF2Anime = async (imageBuffer) => {
    try {
        // 1. Upload Buffer
        const stream = Readable.from(imageBuffer);
        const form = new FormData();
        form.append('file', stream, { filename: 'image.jpg', contentType: 'image/jpeg' });
        form.append('fn_name', 'demo-photo2anime');
        form.append('request_from', '2');
        form.append('origin_from', '111977c0d5def647');

        const upload = await axios.post('https://api.pixnova.ai/aitools/upload-img', form, {
            headers: { ...getBaseHeaders(), ...form.getHeaders() }
        });
        const sourceImage = upload.data?.data?.path;

        // 2. Create Task
        const taskRes = await axios.post('https://api.pixnova.ai/aitools/of/create', {
            fn_name: 'demo-photo2anime',
            call_type: 3,
            input: { source_image: sourceImage, strength: 0.6, prompt: 'use anime style, hd, 8k', request_from: 2 },
            request_from: 2,
            origin_from: '111977c0d5def647'
        }, { headers: { ...getBaseHeaders(), 'content-type': 'application/json' } });
        
        const taskId = taskRes.data?.data?.task_id;

        // 3. Polling (Status Check)
        for (let i = 0; i < 15; i++) { // Max 30 detik agar tidak timeout di Vercel
            await new Promise(r => setTimeout(r, 2000));
            const check = await axios.post('https://api.pixnova.ai/aitools/of/check-status', {
                task_id: taskId, fn_name: 'demo-photo2anime', call_type: 3, request_from: 2, origin_from: '111977c0d5def647'
            }, { headers: { ...getBaseHeaders(), 'content-type': 'application/json' } });
            
            const data = check.data?.data;
            if (data?.status === 2 && data?.result_image) {
                return {
                    status: "success",
                    author: "IyuszTempest",
                    result: data.result_image.startsWith('http') ? data.result_image : `https://oss-global.pixnova.ai/${data.result_image}`
                };
            }
        }
        throw new Error('Timeout di server Pixnova');
    } catch (err) {
        throw new Error(err.message);
    }
};

const handleF2AnimeFromUrl = async (imageUrl) => {
    try {
        const response = await axios.get(imageUrl, { 
            responseType: 'arraybuffer',
            timeout: 10000, // Maksimal nunggu download 10 detik
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
        });

        // Cek ukuran file
        if (response.data.length > 4 * 1024 * 1024) {
            throw new Error("Gambar terlalu besar! Maksimal 4MB untuk Vercel.");
        }

        const buffer = Buffer.from(response.data);
        return await handleF2Anime(buffer); 
    } catch (err) {
        // Cek apakah error datang dari respon API Pixnova
        if (err.response) {
            console.error("Data Error:", err.response.data.toString());
            throw new Error(`API Pixnova Error (${err.response.status}): ${err.response.data}`);
        }
        throw new Error("Gagal mengambil gambar dari URL: " + err.message);
    }
};

// ==========================================
// KATEGORI DOWNLOADER
// ==========================================

const handleAio = async (url) => {
    const key = process.env.RAPIDAPI_KEY || '1dda0d29d3mshc5f2aacec619c44p16f219jsn99a62a516f98';
    if (!url || !url.includes('http')) throw new Error('URL wajib diisi masbro!');

    try {
        const { data } = await axios.post('https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink', 
        { url: url }, 
        {
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'x-rapidapi-host': 'auto-download-all-in-one.p.rapidapi.com',
                'x-rapidapi-key': key,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
            }
        });

        if (data.status === 'fail' || !data.medias) {
            throw new Error(data.msg || 'Gagal ngambil data, mungkin link mati.');
        }

        return {
            status: "success",
            author: "IyuszTempest",
            result: data
        };
    } catch (error) {
        throw new Error(`API Error: ${error.message}`);
    }
};

const handleTikTok = async (tiktokUrl) => {
    try {
        // 1. Get Token & Cookie
        const initialRes = await axios.get('https://tmate.cc/id', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const cookie = initialRes.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ') || '';
        const tokenMatch = initialRes.data.match(/<input[^>]+name="token"[^>]+value="([^"]+)"/i);
        const token = tokenMatch?.[1];

        if (!token) throw new Error('Gagal ambil token TMate');

        // 2. Action Download
        const params = new URLSearchParams();
        params.append('url', tiktokUrl);
        params.append('token', token);

        const res = await axios.post('https://tmate.cc/action', params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://tmate.cc/id',
                'Cookie': cookie
            }
        });

        const html = res.data?.data;
        if (!html) throw new Error('Data TikTok tidak ditemukan');

        // 3. Parsing Data
        const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
        const title = titleMatch?.[1]?.replace(/<[^>]+>/g, '').trim() || 'Tanpa Judul';

        const matches = [...html.matchAll(/<a[^>]+href="(https:\/\/[^"]+)"[^>]*>\s*<span>\s*<span>([^<]*)<\/span><\/span><\/a>/gi)];
        const links = matches.map(([_, href, label]) => ({ href, label: label.trim() }));

        const video = links.find(v => /download without watermark/i.test(v.label))?.href;
        const audio = links.find(v => /download mp3 audio/i.test(v.label))?.href;
        
        // Cek Slide Foto
        const imageMatches = [...html.matchAll(/<img[^>]+src="(https:\/\/tikcdn\.app\/a\/images\/[^"]+)"/gi)];
        const images = [...new Set(imageMatches.map(m => m[1]))];

        return {
            status: "success",
            author: "IyuszTempest",
            result: {
                type: images.length > 0 ? 'image' : 'video',
                title,
                video: video || null,
                audio: audio || null,
                images: images.length > 0 ? images : null
            }
        };
    } catch (error) {
        throw new Error(`TikTok Scraper Error: ${error.message}`);
    }
};

// ==========================================
// KATEGORI FUN
// ==========================================

const handleLahelu = async () => {
    try {
        const randomCursor = Math.floor(Math.random() * 50) + 1;
        const laheluApiUrl = `https://lahelu.com/api/post/get-recommendations?field=5&cursor=${randomCursor}`;
        const response = await fetch(laheluApiUrl);
        const data = await response.json();

        const postsWithMedia = data.postInfos.filter(post =>
            post.content && post.content.some(item => item.type === 1 || item.type === 4)
        );

        if (postsWithMedia.length === 0) throw new Error("Tidak ada media ditemukan");

        const randomPost = postsWithMedia[Math.floor(Math.random() * postsWithMedia.length)];
        const mediaItem = randomPost.content.find(item => item.type === 1 || item.type === 4);
        
        return {
            status: "success",
            message: randomPost.title,
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

// ==========================================
// KATEGORI NSFW
// ==========================================

const handleWangy = async () => {
    const randomUrl = wangyImageUrls[Math.floor(Math.random() * wangyImageUrls.length)];
    return { 
        status: "Sukses kak!", 
        author: "IyuszTempest", 
        media: { type: "image", url: randomUrl } 
    };
};

// ==========================================
// KATEGORI TOOLS
// ==========================================

const handlePresetAM = async () => {
    const randomPreset = presetsAM[Math.floor(Math.random() * presetsAM.length)];
    return {
        status: "success",
        author: "IyuszTempest",
        message: "Berhasil mendapatkan preset Alight Motion random.",
        result: randomPreset
    };
};

const handleSub4Unlock = async (url) => {
    try {
        const Key = 'global.apifgsi'; 
        const apiUrl = `https://fgsi.dpdns.org/api/tools/skip/sub4unlock?apikey=${Key}&url=${encodeURIComponent(url)}`;
        
        const response = await axios.get(apiUrl);
        
        if (response.data && response.data.data) {
            return {
                status: "Sukses kak!",
                author: "IyuszTempest",
                result: response.data.data.linkGo // Mengambil link tujuan
            };
        } else {
            throw new Error("Gagal melewati link.");
        }
    } catch (error) {
        throw new Error("Terjadi kesalahan pada API Skiplink.");
    }
};

// --- EXPORT SEMUA FUNGSI ---
module.exports = { 
    handleJjcosplay, 
    handleWangy, 
    handleEuphy, 
    handleLivechart, 
    handleJikanmoe,
    handleLahelu,
    handlePresetAM,
    handleSub4Unlock,
    handleCreatePrompt,
    handleCreart,
    handleAiLabs: aiLabs.generate,
    handleDeepImg,
    handleLive3D,
    handleF2Anime,
    handleF2AnimeFromUrl,
    handleAio,
    handleTikTok
};
