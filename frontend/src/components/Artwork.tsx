import React from 'react';

interface ArtworkProps {
  artwork: {
    id: string;
    title: string;
    imageUrl: string;
    artist: string;
  };
}

const Artwork: React.FC<ArtworkProps> = ({ artwork }) => {
  return (
    <div className="artwork-card">
      <img src={artwork.imageUrl} alt={artwork.title} />
      <h3>{artwork.title}</h3>
      <p>{artwork.artist}</p>
    </div>
  );
};

export default Artwork;
