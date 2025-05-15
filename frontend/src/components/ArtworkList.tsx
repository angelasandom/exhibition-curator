import React from 'react';
import Artwork from './Artwork';

interface ArtworkData {
  id: string;
  title: string;
  imageUrl: string;
  artist: string;
}

interface ArtworkListProps {
  artworks: ArtworkData[];
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworks }) => {
  return (
    <div className="artwork-list">
      {artworks.map((artwork) => (
        <Artwork key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkList;
