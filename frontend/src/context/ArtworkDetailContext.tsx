import React, { createContext, useContext, useState } from "react";
import type { ArtworkType } from "../types/ArtworkType";

interface ContextType {

  selectedArtwork: ArtworkType | null;
  openArtworkModal: (artwork: ArtworkType) => void;
  closeArtworkModal: () => void;
}

const ArtworkDetailContext  = createContext<ContextType | undefined>(undefined);

export const ArtworkDetailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkType | null>(null);

  const openArtworkModal = (artwork: ArtworkType) => setSelectedArtwork(artwork);
  const closeArtworkModal = () => setSelectedArtwork(null);

  return (
    <ArtworkDetailContext.Provider value={{ selectedArtwork, openArtworkModal, closeArtworkModal }}>
       {children}
    </ArtworkDetailContext.Provider>
  );
};

export const useArtworkDetail = (): ContextType => {
    
  const context = useContext(ArtworkDetailContext);
  if (!context) throw new Error("useArtworkDetail must be used within ArtworkDetailProvider");
  return context;
};
