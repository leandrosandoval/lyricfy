// Song finder.
const axios = require("axios")
const API_URL = process.env.API_URL
const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY
const bot = new Slack({token: SLACK_BOT_TOKEN})

function trackSearch(lyrics) {
    try {
        // implement finder
        const response = await fetch(API_URL + `/track.search`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: {
                q_lyrics: lyrics.toString(),
                s_artist_rating: "desc",
                s_track_rating: "desc",
                s_quorum_factor: 1,
                // paginated so I don't get the whole lot of songs with those lyrics but only the top 3 most relevant ones. 
                page_size: 3,
                page: 1
            }
        })

        const matches = response.text
        let songNames = []
        JSON.parse(matches.track_list).forEach(element => {
            songNames.push(element.track_name)
        })
        const text = `Best matches for those lyrics are: ${songNames[0]} , ${songNames[1]}, and ${songNames[2]}`

        // how to post messages
    } catch (err) {
        console.log('oops, ${err.message}')
        // should I add a response here?
    }

}

module.exports = {
    trackSearch
};