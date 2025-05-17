import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArtworkList from '../components/ArtworkList';
import type { ArtworkType } from '../types/ArtworkType';

const Home: React.FC = () => {
  const [randomKey] = useState(() => Date.now()); //Change artworks when refreshing page

  const { data = [], isLoading, error } = useQuery<ArtworkType[]>({
    queryKey: ['artworks', randomKey],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/artworks/random');
      if (!res.ok) throw new Error('Failed to fetch artworks');
      return res.json();
    },
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
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
