import React, { useState } from 'react';
import { Search, Music2, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const App = () => {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchLyrics = async () => {
    if (!artist.trim() || !song.trim()) {
      setError("Please enter both artist and song name");
      return;
    }
    
    setLoading(true);
    setLyrics("");
    setError("");
    
    try {
      const res = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`
      );
      
      if (!res.ok) {
        throw new Error('Failed to fetch lyrics');
      }
      
      const data = await res.json();
      if (data.lyrics) {
        setLyrics(data.lyrics);
      } else {
        setError("No lyrics found. Please check the artist and song name.");
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
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Lyrics Finder
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Discover song lyrics instantly with our professional search engine
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Music2 className="w-5 h-5" />
              Search Lyrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Artist name"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Song title"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <button
              onClick={searchLyrics}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search Lyrics
                </>
              )}
            </button>

            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-600 text-white">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {lyrics && (
          <Card className="mt-6 bg-white/10 backdrop-blur-lg border-none shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Music2 className="w-5 h-5" />
                {artist} - {song}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/20 rounded-lg p-6">
                <pre className="text-gray-200 font-sans whitespace-pre-wrap break-words">
                  {lyrics}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;