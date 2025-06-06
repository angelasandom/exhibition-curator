import React from 'react';
import type { ArtworkType } from '../types/ArtworkType';
import './Artwork.css';
import CreateCollectionButton from '../components/CreateCollectionButton';

interface Props {
  artwork: ArtworkType;
}

const Artwork: React.FC<Props> = ({ artwork }) => {
  return (
    <div className="artwork-card">
      <img src={artwork.imageUrl} alt={artwork.title} />
      <div className="artwork-info">
        <h3>{artwork.title}</h3>
        <p>{artwork.creator}</p>
        <CreateCollectionButton artwork={artwork} />
      </div>
    </div>
  );
};

export default Artwork;