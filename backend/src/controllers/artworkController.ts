import { Request, Response } from 'express';
import { fetchRandomUnifiedArtworks } from '../services/unifiedAPIs';

export const getRandomArtworks = async (req: Request, res: Response) => {
  try {
    const artworks = await fetchRandomUnifiedArtworks();
    res.json(artworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

