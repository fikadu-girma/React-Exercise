import { useEffect, useState } from "react";
import "./movies.css";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("batman");
  const [loading, setLoading] = useState(true);

  async function fetchMovies(query: string) {
    setLoading(true);
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=564727fa&s=${query}`
    );
    const data = await res.json();
    setMovies(data.Search || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovies(search);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchMovies(search);
  }

  if (loading) return <p className="loading">🎥 Loading movies...</p>;

  return (
    <div className="movies-wrapper">
      <h2>🎬 Movie Explorer (API Example)</h2>

      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          placeholder="Search movies…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍 Search</button>
      </form>

      <div className="movies-grid">
        {movies.map((m) => (
          <div key={m.imdbID} className="movie-card">
            <img src={m.Poster} alt={m.Title} />
            <div className="overlay">
              <h4>{m.Title}</h4>
              <span>{m.Year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
