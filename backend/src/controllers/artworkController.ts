import { Request, Response } from 'express';
import { fetchRandomUnifiedArtworks } from '../services/unifiedAPIs';

export const getRandomArtworks = async (req: Request, res: Response) => {
  try {
    const artworks = await fetchRandomUnifiedArtworks();
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching artworks', error });
  }
};
