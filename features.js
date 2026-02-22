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
            status: "success",
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


module.exports = { handleLahelu };
