import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArtworkList from '../components/ArtworkList';
import Navbar from '../components/Navbar';
import type { ArtworkType } from '../types/ArtworkType';
import { fetchRandomArtworks } from '../services/api';

const Home: React.FC = () => {
  const [randomKey] = useState(() => Date.now()); //Change artworks when refreshing page

  const { data = [], isLoading, error } = useQuery<ArtworkType[]>({
    queryKey: ['artworks', randomKey],
    queryFn: fetchRandomArtworks,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading artworks.</p>;

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

