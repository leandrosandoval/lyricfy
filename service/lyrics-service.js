// Song finder.
const axios = require("axios")
const API_URL = process.env.API_URL
const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY

const musixmatchCall = async lyrics => {
    return axios({
        method: 'GET',
        url: API_URL,
        headers: { 'Content-Type': 'application/json' },
        params: {
            q_lyrics: lyrics.toString(),
            s_track_rating: "desc",
            s_quorum_factor: 1,
            // paginate so I don't get the whole lot of songs with those lyrics but only the top 3 most relevant ones. 
            page_size: 3,
            page: 1,
            apikey: MUSIXMATCH_API_KEY  
        }
    })
}

const trackSearch = async (lyrics) => {
    try {

        const response = await musixmatchCall(lyrics);
        const matches = [];
        const tracks = response.data.message.body.track_list;
        for (let i=0;i<tracks.length;i++) {
            matches.push(tracks[i].track.track_name);
        }
        console.log(matches);
        return matches;
    } catch (err) {
        console.log(`oops, ${err.message}`);
    }
}

module.exports = {
    trackSearch
};