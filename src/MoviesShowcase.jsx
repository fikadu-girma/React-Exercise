import React, { useEffect, useState } from "react";
import "./MovieShowcase.css"; 

const MovieShowcase = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const movies = [
    "https://m.media-amazon.com/images/M/MV5BNzA5ZDMzNzUt.jpg",
    "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmYt.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTk0NTU4Njg1OV5BMl5BanBnXkFtZTgwODU2NzE0MjE@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjA5NzYyNzAzNl5BMl5BanBnXkFtZTgwNDYyNDI5NzE@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BYzA5YzlmZDgt.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTc3MjYzNzA0MV5BMl5BanBnXkFtZTgwNjc3NDM0NzE@._V1_.jpg",
  ];

  const formatTime = (time) =>
    time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const formatDate = (time) =>
    time.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="showcase-container">
      <div className="time-box">
        <h2>{formatDate(currentTime)}</h2>
        <h1>{formatTime(currentTime)}</h1>
      </div>

      <div className="poster-container">
        <div className="poster-strip">
          {movies.concat(movies).map((poster, index) => (
            <img key={index} src={poster} alt="Movie Poster" className="poster" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieShowcase;
