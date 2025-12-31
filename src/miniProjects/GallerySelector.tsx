import React, { useState } from "react";
import "./gallery.css";

export default function GallerySelector() {
  const images = [
    "https://picsum.photos/id/1011/400/300",
    "https://picsum.photos/id/1015/400/300",
    "https://picsum.photos/id/1021/400/300",
    "https://picsum.photos/id/1031/400/300",
    "https://picsum.photos/id/1043/400/300",
    "https://picsum.photos/id/1050/400/300",
  ];

  const [selected, setSelected] = useState<number[]>([]);

  function toggleSelect(index: number) {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  }

  return (
    <div className="gallery-wrapper">
      <h2>🖼️ Image Gallery Selection</h2>

      <div className="gallery-grid">
        {images.map((src, index) => (
          <div
            key={index}
            className={`gallery-item ${
              selected.includes(index) ? "selected" : ""
            }`}
            onClick={() => toggleSelect(index)}
          >
            <img src={src} alt={`Gallery ${index}`} />
            {selected.includes(index) && <span className="check">✓</span>}
          </div>
        ))}
      </div>

      <div className="footer">
        <strong>Selected:</strong> {selected.length} image(s)
      </div>
    </div>
  );
}
