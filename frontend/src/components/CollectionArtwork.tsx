import React from 'react';
import type { ArtworkType } from '../types/ArtworkType';
import './Artwork.css';

interface Props {
  artwork: ArtworkType;
}

const CollectionArtwork: React.FC<Props> = ({ artwork }) => {
  return (
    <div className="artwork-card">
      <img src={artwork.imageUrl} alt={artwork.title} />
      <div className="artwork-info">
        <h3>{artwork.title}</h3>
        <p>{artwork.creator}</p>
      </div>
    </div>
  );
};

export default CollectionArtwork;