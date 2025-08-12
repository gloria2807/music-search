const API_KEY = "YOUR_API_KEY"; // Replace with your Musixmatch API key
const BASE_URL = "https://api.musixmatch.com/ws/1.1/";

document.getElementById("searchBtn").addEventListener("click", searchSongs);

function searchSongs() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) {
        alert("Please enter a search term");
        return;
    }

    fetch(`${BASE_URL}track.search?q_track_artist=${query}&page_size=10&page=1&s_track_rating=desc&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const tracks = data.message.body.track_list;
            displayResults(tracks);
        })
        .catch(() => {
            document.getElementById("results").innerHTML = "<p>Error fetching data</p>";
        });
}

function displayResults(tracks) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!tracks || tracks.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
    }

    tracks.forEach(item => {
        const track = item.track;
        const div = document.createElement("div");
        div.className = "result-item";
        div.textContent = `${track.track_name} - ${track.artist_name}`;
        div.addEventListener("click", () => getLyrics(track.track_id));
        resultsDiv.appendChild(div);
    });
}

function getLyrics(trackId) {
    fetch(`${BASE_URL}track.lyrics.get?track_id=${trackId}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const lyrics = data.message.body.lyrics;
            document.getElementById("lyrics").innerText = lyrics
                ? lyrics.lyrics_body
                : "No lyrics found.";
        })
        .catch(() => {
            document.getElementById("lyrics").innerText = "Error fetching lyrics.";
        });
}
