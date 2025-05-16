import axios from 'axios';
import type { ArtworkType } from '../types/ArtworkType';

export const fetchRandomArtworks = async (): Promise<ArtworkType[]> => {
  const { data } = await axios.get<ArtworkType[]>(
    `${import.meta.env.VITE_BACKEND_URL}/api/artworks/random`
  );
  return data;
};