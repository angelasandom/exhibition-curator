import { useUser } from '../context/UserContext';
import type { ArtworkType } from '../types/ArtworkType';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const useCollections = () => {
  const { user } = useUser();

  const getToken = async () => {
    if (!user) throw new Error("Not authenticated");
    return await user.getIdToken();
  };

  const createCollection = async (name: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/collections`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create collection");
      }
      
      return res.json();
    } catch (error) {
      console.error("Error creating collection:", error);
      throw error;
    }
  };

  const addArtwork = async (collectionName: string, artwork: ArtworkType) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/collections/add-artwork`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionName, artwork }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add artwork");
      }
      
      return res.json();
    } catch (error) {
      console.error("Error adding artwork:", error);
      throw error;
    }
  };

  const removeArtwork = async (collectionName: string, artworkId: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/collections/remove-artwork`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionName, artworkId }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to remove artwork");
      }
      
      return res.json();
    } catch (error) {
      console.error("Error removing artwork:", error);
      throw error;
    }
  };

  const getCollections = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/collections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch collections");
      }
      
      return res.json();
    } catch (error) {
      console.error("Error fetching collections:", error);
      throw error;
    }
  };

  const deleteCollection = async (collectionName: string) => {

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/collections/${encodeURIComponent(collectionName)}`, {
        method: "DELETE" ,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete collection");
      }
      
      return  res.json();
    } catch (error) {
      console.error("Error deleting collection:", error);
      throw error;
    }
  };

  return { createCollection, addArtwork, removeArtwork, getCollections, deleteCollection };
};