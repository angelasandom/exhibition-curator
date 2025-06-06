import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ArtworkList from '../components/ArtworkList';
import Navbar from '../components/Navbar';
import type { ArtworkType } from '../types/ArtworkType';
import { fetchRandomArtworks, fetchFilteredArtworks } from '../services/api';
import SearchBar from '../components/SearchBar';

const itemsPerPage = 10;

const Home: React.FC = () => {
  
  const [randomKey] = useState(() => Date.now());

  const [searchTerm, setSearchTerm] =  useState('');
  const [selectedType, setSelectedType] = useState('');
  const [filteredResults, setFilteredResults] = useState<ArtworkType[]>([]);
  const [currentPage, setCurrentPage] =  useState(1);

  const { data: randomArtworks = [], isLoading, error } = useQuery<ArtworkType[]>({
    queryKey: ['artworks', randomKey],
    queryFn: fetchRandomArtworks,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const handleSearch = async () => {

    setCurrentPage(1);

    if (searchTerm || selectedType) {
      const results = await fetchFilteredArtworks({
        searchTerm,
        type: selectedType
      });
      setFilteredResults(results);
    } else {
      setFilteredResults([]); 
    }
  };

  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end =  currentPage * itemsPerPage;
    return filteredResults.slice(start, end);
  }, [filteredResults, currentPage]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {

    handleSearch();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading artworks.</p>;

  return (
    <div>
      <header>
        <Navbar />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onSearch={handleSearch}
        />

      </header>

      <div className='subheader'>
        <h2 className= 'text-gallery'>Manage your own Art Gallery</h2>
        <h3 className='text-collections'>Create different Art Collections</h3>
        <p className="feature-text">FEATURE ARTWORKS:</p>
      </div>

      <ArtworkList artworks= {filteredResults.length ? paginatedResults : randomArtworks} />

      {filteredResults.length >itemsPerPage && (
        <div className="pagination">
          <button onClick={goToPrev} disabled={currentPage === 1}>
            ← Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={goToNext} disabled={currentPage === totalPages}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
