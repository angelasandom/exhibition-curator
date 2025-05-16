import React from 'react';
import Artwork from './Artwork';
import type { ArtworkType } from '../types/ArtworkType';

interface Props {
  artworks: ArtworkType[];
}

const ArtworkList: React.FC<Props> = ({ artworks }) => (
  <div className="artwork-list">
    {artworks.map(art => (
      <Artwork key={art.id} artwork={art} />
    ))}
  </div>
);

export default ArtworkList;
