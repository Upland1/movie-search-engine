import { useState } from 'react';

const API_KEY = 'APIKEY'; // Here goes your API key

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Web service error. Try again.");
      setMovies([]);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Look for a movie !!!</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Looking for movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" style={{ display: 'flex', gap: '1rem'}}>Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
              style={{ width: '100%' }}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
