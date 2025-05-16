import React from 'react';
import type { ArtworkType } from '../types/ArtworkType';

interface Props {
  artwork: ArtworkType;
}

const Artwork: React.FC<Props> = ({ artwork }) => (
  <div className="artwork-card">
    <img src={artwork.imageUrl} alt={artwork.title} />
    <h3>{artwork.title}</h3>
    <p>{artwork.creator}</p>
  </div>
);

export default Artwork;