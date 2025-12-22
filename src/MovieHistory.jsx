import React from "react";

const MovieHistory = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📚 Search History</h3>
      <div style={styles.grid}>
        {history.map((movie) => (
          <div key={movie.imdbID} style={styles.card}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
              style={styles.poster}
            />
            <p style={styles.name}>{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "30px",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "10px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  poster: {
    width: "100%",
    borderRadius: "6px",
  },
  name: {
    fontSize: "14px",
    marginTop: "5px",
  },
};

export default MovieHistory;
