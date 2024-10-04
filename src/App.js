import "./App.css";
import React, { useState } from "react";

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");

  const searchLyrics = async () => {
    try {
      const res = await fetch(
        `https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}&apikey=73a1764f7298d1ba5df50e7a82a61bbf`
      );
      const data = await res.json();
      if (data.type === "exact" || data.type === "aprox") {
        setLyrics(data.mus[0].text);
      } else {
        setLyrics("No lyrics found");
      }
    } catch (err) {
      console.error("Error fetching lyrics", err);
    }
  };

  return (
    <div className="min-w-screen flex flex-col items-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <h2 className="text-[2rem] font-bold text-blue-600 text-center mb-3">
        Lyrics Finder
      </h2>
      <p className="text-center font-bold text-white mb-9">
        Please input the correct artist name and song to ensure accurate result!!
      </p>
      <div className="flex  gap-5 justify-center mb-5 flex-col">
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist"
          className=" border-2 rounded-lg p-2 border-blue-600  outline-none"
        />
        <input
          type="text"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          placeholder="Song"
          className=" border-2 rounded-lg p-2 border-blue-600  outline-none"
        />
      </div>
      <button
        onClick={() => searchLyrics()}
        className="p-2 px-6 bg-blue-700 rounded-lg text-white font-bold hover:bg-blue-900 "
      >
        Find
      </button>
      <pre className="text-white font-bold mt-6 text-center">{lyrics}</pre>
    </div>
  );
}

export default App;
