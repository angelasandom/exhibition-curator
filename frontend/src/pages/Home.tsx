import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRandomArtworks } from '../services/api';
import ArtworkList from '../components/ArtworkList';
import type { ArtworkType } from '../types/ArtworkType';

const Home: React.FC = () => {
const { data = [], isLoading, error } = useQuery<ArtworkType[]>({
  queryKey: ['artworks'],
  queryFn: fetchRandomArtworks,
});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading artworks.</p>;
  console.log("Fetched artworks:", data);

  return (
    <div>
      <h1>Exhibition Curator</h1>
      <ArtworkList artworks={data} />
    </div>
  );
};

export default Home;
