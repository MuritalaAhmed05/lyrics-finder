import React, { useState } from 'react';
import { Search, Music2, AlertCircle, Loader2 } from 'lucide-react';

const CustomCard = ({ children, className = '' }) => (
  <div className={`bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 ${className}`}>
    {children}
  </div>
);

const CustomAlert = ({ message }) => (
  <div className="flex items-center gap-2 bg-red-900/50 border border-red-600 text-white p-4 rounded-lg">
    <AlertCircle className="h-5 w-5 flex-shrink-0" />
    <p className="text-sm">{message}</p>
  </div>
);

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchLyrics = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a song to search");
      return;
    }
    
    setLoading(true);
    setSongData(null);
    setError("");
    
    try {
      const res = await fetch(
        `https://api.nexoracle.com/search/lyrics?apikey=4aeb57e3ed0f238762&q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!res.ok) {
        throw new Error('Failed to fetch lyrics');
      }
      
      const data = await res.json();
      if (data.status === 200 && data.result) {
        setSongData(data.result);
      } else {
        setError("No lyrics found. Please try a different search.");
      }
    } catch (err) {
      console.error("Error fetching lyrics", err);
      setError("Failed to fetch lyrics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchLyrics();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
            Lyrics Finder
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Discover song lyrics instantly with our professional search engine
          </p>
        </div>

        {/* Search Section */}
        <CustomCard>
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Music2 className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Search Lyrics</h2>
            </div>

            <div className="group relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter song name or lyrics"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200
                         group-hover:bg-white/10"
              />
            </div>

            <button
              onClick={searchLyrics}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium 
                       flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Search Lyrics</span>
                </>
              )}
            </button>

            {error && <CustomAlert message={error} />}
          </div>
        </CustomCard>

        {/* Lyrics Display Section */}
        {songData && (
          <CustomCard className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              {songData.image && (
                <img 
                  src={songData.image} 
                  alt={songData.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-white">{songData.title}</h2>
                <p className="text-gray-300">{songData.artist}</p>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-6">
              <pre className="text-gray-200 font-sans whitespace-pre-wrap break-words leading-relaxed">
                {songData.lyrics}
              </pre>
            </div>
          </CustomCard>
        )}
      </div>
    </div>
  );
};

export default App;