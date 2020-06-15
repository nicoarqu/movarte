import React from 'react';

export const Gallery = () => {
  const images = [1, 2, 3];
  return (
    <div>
      <h2>Explora la galería de imágenes</h2>
      <p>Puedes lograr esto y más</p>
      <div className="gallery-container">
        {images.map((img) => (
          <div className="responsive" key={img}>
            <div className="gallery">
              <a target="_blank" href="img_5terre.jpg">
                <img
                  src="https://www.w3schools.com/css/img_5terre.jpg"
                  alt="Cinque Terre"
                  width="600"
                  height="400"
                />
              </a>
              <div className="desc">Add a description of the image here</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
