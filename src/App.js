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
    <div className="min-w-screen flex flex-col items-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-4">
        Lyrics Finder
      </h2>
      <p className="text-center font-bold text-white mb-8 text-sm md:text-base">
        Please input the correct artist name and song to ensure accurate results!
      </p>

      <div className="flex flex-col gap-4 justify-center items-center w-full max-w-md">
        <label className="flex flex-col text-xs text-gray-400 font-bold w-full">
          <span className="self-center">Artist:</span>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist"
            className="border-2 rounded-lg p-2 border-blue-600  outline-none  text-black text-base self-center placeholder:text-left placeholder:pl-3 placeholder:text-gray-500 w-[70%] focus:ring-2 focus:ring-blue-600"
          />
        </label>
        <label className="flex flex-col  text-xs text-gray-400 font-bold w-full">
          <span className="self-center">Song:</span>
          <input
            type="text"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            placeholder="Song"
            className="border-2 rounded-lg p-2 border-blue-600 outline-none  text-black text-base self-center placeholder:text-left placeholder:pl-3 placeholder:text-gray-500 w-[70%] focus:ring-2 focus:ring-blue-600"
          />
        </label>
      </div>

      <button
        onClick={searchLyrics}
        className="mt-6 p-2 px-6 bg-blue-700 rounded-lg text-white font-bold hover:bg-blue-900 transition duration-200"
      >
        Find
      </button>

      <pre className="text-white font-bold mt-8 text-xs sm:text-sm text-center whitespace-pre-wrap max-w-full overflow-auto">
        {lyrics}
      </pre>
    </div>
  );
}

export default App;
