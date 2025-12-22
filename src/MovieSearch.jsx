import React, { useState } from "react";
import MovieHistory from "./MovieHistory"; // import the history component

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); // store searched movies

  const API_KEY = "thewdb"; // demo key — you can get your own at https://www.omdbapi.com/apikey.aspx

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setMovie(null);

    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovie(data);

        // Add to history (if not already there)
        setHistory((prev) => {
          const exists = prev.find((m) => m.imdbID === data.imdbID);
          return exists ? prev : [data, ...prev];
        });
      } else {
        setError("Movie not found. Try another title!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎥 Movie Finder</h2>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {movie && (
        <div style={styles.movieCard}>
          <img src={movie.Poster} alt={movie.Title} style={styles.poster} />
          <div style={styles.details}>
            <h3>{movie.Title} ({movie.Year})</h3>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
          </div>
        </div>
      )}

      {/* pass history array to MovieHistory component */}
      <MovieHistory history={history} />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "40px auto",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: { color: "#222" },
  searchBox: { marginBottom: "20px" },
  input: {
    padding: "10px",
    width: "70%",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    marginLeft: "10px",
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  movieCard: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: "20px",
    textAlign: "left",
  },
  poster: {
    width: "150px",
    borderRadius: "8px",
    marginRight: "15px",
  },
  details: { flex: 1 },
};

export default MovieSearch;
