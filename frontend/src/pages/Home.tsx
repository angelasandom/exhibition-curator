import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArtworkList from '../components/ArtworkList';
import type { ArtworkType } from '../types/ArtworkType';
import Navbar from '../components/Navbar';

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
      <header>
        <h1 className='header-title'>Exhibition Curator</h1>
        <Navbar />
      </header>
      <div className='subheader'>
        <h2 className='text-gallery'>Manage your own Art Gallery</h2>
        <h3 className='text-collections'>Create different Art Collections</h3>
        <p className="feature-text">FEATURE ARTWORKS:</p>
      </div>
      <ArtworkList artworks={data} />
    </div>
  );
};

export default Home;
