import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { ArtworkType } from "../types/ArtworkType";

interface Collection {
  id: string;
  name: string;
  artworks: ArtworkType[] ;
}

interface  GalleryContextType  {
  collections: Collection[];
  addCollection: (name : string) => void;
  addArtworkToCollection: (collectionId: string, artwork: ArtworkType) => void;
  removeArtworkFromCollection: (collectionId: string, artworkId: string) => void;
}

const GalleryContext =  createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [collections, setCollections] = useState<Collection[]>([]);
  const addCollection = (name: string) => {

    const newCollection: Collection = {
      id:  Date.now().toString(),
      name ,
      artworks: []
    };
    setCollections((prev) => [...prev, newCollection]);
  };

  const addArtworkToCollection = (collectionId: string, artwork: ArtworkType) => {

    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId
          ? { ...col, artworks: [...col.artworks, artwork] }
          : col
      )
    );

  };

  const removeArtworkFromCollection  = (collectionId: string, artworkId: string) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId
          ? { ...col, artworks: col.artworks.filter((a) => a.id !== artworkId) }
          : col
      )
    );

  };

  return (

    <GalleryContext.Provider
      value={{ collections, addCollection,  addArtworkToCollection, removeArtworkFromCollection }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery =  () => {
  const context = useContext(GalleryContext);
  if (!context) throw new Error("Must be used within a GalleryProvider");

  return context;
};
