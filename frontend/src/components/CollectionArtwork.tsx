import React from 'react';
import type { ArtworkType } from '../types/ArtworkType';
import Artwork from './Artwork';

interface Props {
  artwork: ArtworkType;
}

const CollectionArtwork: React.FC<Props> = ({ artwork }) => {
  return <Artwork artwork={artwork} showAddButton={false} />;
};

export default CollectionArtwork;