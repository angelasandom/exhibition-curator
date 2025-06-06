import { Request, Response } from 'express';
import { fetchRandomUnifiedArtworks } from '../services/unifiedAPIs';
import axios from 'axios';

export const getRandomArtworks = async (req: Request, res: Response) => {
  try {
    const artworks = await fetchRandomUnifiedArtworks();
    res.json(artworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const searchArtworks = async (req: Request, res: Response) => {

  const { searchTerm = "", type = "", style = "" } = req.query;

  try {
    const results: any[] = [];

    const harvard = await axios.get('https://api.harvardartmuseums.org/object', {
      params: {
        apikey: process.env.HARVARD_API_KEY,
        hasimage: 1,
        size: 100,
        q: searchTerm,
      },
    });

    const harvardResults = harvard.data.records
      .filter((art: any) => art.baseimageurl || art.primaryimageurl)
      .map((art: any) => {
        const typeValue = art.classification || 'Unknown';
        return {
          id: `harvard-${art.id}`,
          title: art.title || 'Untitled',
          imageUrl:  art.baseimageurl || art.primaryimageurl,
          creator: art.people?.map((p: any) => p.name).join(', ') || 'Unknown',
          type: typeValue,
          source: 'Harvard Art Museums',
        };
      })
      .filter((art: any) => {
        const typeMatch = !type || (typeof art.type === 'string' && art.type.toLowerCase().includes((type as string).toLowerCase()));
        return typeMatch;
     });


    const cleveland = await axios.get('https://openaccess-api.clevelandart.org/api/artworks', {
      params: {
        q: searchTerm,
        limit: 100,
        has_image: 1,
      },
    });

    const clevelandResults =  cleveland.data.data
      .filter((art: any) => art.images?.web?.url)
      .map((art: any) => {
        const typeValue = art.type || 'Unknown';
        return {
          id: `cleveland-${art.id}`,
          title: art.title || 'Untitled',
          imageUrl: art.images.web.url,
          creator: art.creators?.map((c: any) =>  c.description).join(', ') || 'Unknown',
          type: typeValue,
          source: 'The Cleveland Museum of Art',
        };
      })

      .filter((art: any) => {
        const typeMatch = !type || (typeof art.type === 'string' && art.type.toLowerCase().includes((type as string).toLowerCase()));
        return typeMatch;
      });

    results.push(...harvardResults, ...clevelandResults);

    res.json(results);
    
  } catch (error) {
    console.error('Error searching artworks:', error);
    res.status(500).json({ message: 'Error searching artworks' });
  }
};
