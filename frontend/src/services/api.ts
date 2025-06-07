import axios from "axios";
import type { ArtworkType } from "../types/ArtworkType";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const HARVARD_API_KEY = import.meta.env.VITE_HARVARD_API_KEY;

export const fetchRandomArtworks = async (): Promise<ArtworkType[]> => {
  const { data } = await axios.get(`${BASE_URL}/api/artworks/random`);
  return data;
};

interface SearchParams {
  searchTerm?: string;
  type?: string;
}

export const fetchFilteredArtworks = async (params: SearchParams): Promise<ArtworkType[]> => {
  const { searchTerm = "", type = ""} = params;
  const { data } = await axios.get(`${BASE_URL}/api/artworks/search`, {
    params: {
      searchTerm,
      type
    }
  });

  
  return data;
};
