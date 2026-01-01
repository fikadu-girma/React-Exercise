import { useEffect, useState } from "react";
import "./gallery.css";

interface Photo {
  id: string;
  author: string;
  download_url: string;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPhotos() {
    setLoading(true);
    const res = await fetch("https://picsum.photos/v2/list?page=2&limit=12");
    const data: Photo[] = await res.json();
    setPhotos(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) return <p className="loading">⏳ Loading photos...</p>;

  return (
    <div className="wrapper">
      <h2>📸 Stylish Photo Gallery (API Example)</h2>

      <div className="grid">
        {photos.map((photo) => (
          <div key={photo.id} className="card">
            <img src={photo.download_url} alt={photo.author} />
            <div className="overlay">
              <p>{photo.author}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="refresh" onClick={fetchPhotos}>
        🔄 Load More
      </button>
    </div>
  );
}
