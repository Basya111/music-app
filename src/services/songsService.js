import axios from "axios";

export const songsService = {
    getVideos,
    refactorVideo,
    getDuration
}

async function getVideos(val) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=10&type=video&key=AIzaSyB6LkedWuPAsqHO5TISuxANRqIkdws8CPk&q=${val}`
    const res = await axios.get(url)
    return res.data.items
}

async function getDuration(val) {
    const url = `www.googleapis.com/youtube/v3/videos?id=${val}&key=AIzaSyB6LkedWuPAsqHO5TISuxANRqIkdws8CPk`
    const res = await axios.get(url)
    return res.data.items[0].duration
}

function refactorVideo(video){
    const id = video.id.videoId
    // let songLen = getDuration(id)
    return {
        id,
        title: video.snippet.title,
        imgUrl: video.snippet.thumbnails.default.url,
        url: `https://www.youtube.com/embed/${id}`,
        // duration: getDurationStr(songLen)
    }
}

function getDurationStr(val){
    // PT4M13S
    var str = val
    return str
}

// https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyB6LkedWuPAsqHO5TISuxANRqIkdws8CPk&q=beatles
// API = 'AIzaSyB6LkedWuPAsqHO5TISuxANRqIkdws8CPk'

// https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&maxResults=10&key=AIzaSyB6LkedWuPAsqHO5TISuxANRqIkdws8CPk&q=beatles

