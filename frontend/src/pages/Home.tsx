import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import ArtworkList from '../components/ArtworkList';
import Navbar from '../components/Navbar';
import type { ArtworkType } from '../types/ArtworkType';
import { fetchRandomArtworks, fetchFilteredArtworks } from '../services/api';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from "../components/LoadingSpinner";
import "./Home.css";

const itemsPerPage = 10;

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [filteredResults, setFilteredResults] = useState<ArtworkType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: randomArtworks = [], isLoading, error } = useQuery<ArtworkType[]>({
    queryKey: ['artworks'],
    queryFn: fetchRandomArtworks,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  //when load show query in URL
  useEffect(() => {
    const initialType = searchParams.get('type') || '';
    const initialSearch = searchParams.get('search') || '';
    setSearchTerm(initialSearch);
    setSelectedType(initialType);

    if (initialType || initialSearch) {
      handleSearch(initialSearch, initialType);
    }
  }, []);

  //when change filters and search update results and URL
  useEffect(() => {
    const delay = setTimeout(() => {
      const params: any = {};
      if (selectedType) params.type = selectedType;
      if (searchTerm) params.search = searchTerm;
      setSearchParams(params);

      if (selectedType || searchTerm) {
        handleSearch(searchTerm, selectedType);
      } else {
        setFilteredResults([]);
      }

      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, selectedType]);

  const handleSearch = async (query: string, type: string) => {
    const results = await fetchFilteredArtworks({
      searchTerm: query,
      type: type,
    });
    setFilteredResults(results);
  };

  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResults.slice(start, start + itemsPerPage);
  }, [filteredResults, currentPage]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) return <LoadingSpinner />;
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
        />
      </header>

      <div className="subheader">
        <h2 className="text-gallery">Manage your own Art Gallery</h2>
        <h3 className="text-collections">Create different Art Collections</h3>
      </div>

      <ArtworkList
        artworks={filteredResults.length ? paginatedResults : randomArtworks}
      />

      {filteredResults.length > itemsPerPage && (
        <div className="pagination">
          <button onClick={goToPrev} disabled={currentPage === 1}>
            ← Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={goToNext} disabled={currentPage === totalPages}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;