import axios from 'axios';

export const fetchRandomUnifiedArtworks = async () => {
  const [clevelandRes, harvardRes] = await Promise.all([
    axios.get('https://openaccess-api.clevelandart.org/api/artworks', {
      params: {
        limit: 10,
        has_image: 1,
        sort: 'random'
      }
    }),
    axios.get('https://api.harvardartmuseums.org/object', {
      params: {
        apikey: process.env.HARVARD_API_KEY,
        hasimage: 1,
        size: 10,
        sort: 'random'
      }
    })
  ]);

  const clevelandData = clevelandRes.data.data;
  const harvardData = harvardRes.data.records;

  const formattedCleveland = clevelandData.map((art: any) => ({
    id: art.id,
    title: art.title,
    imageUrl: art.images?.web?.url,
    creator: art.creators?.map((c: any) => c.description).join(', ') || 'Unknown',
    source: 'The Cleveland Museum of Art'
  }));

  const formattedHarvard = harvardData.map((art: any) => ({
    id: art.id,
    title: art.title,
    imageUrl: art.baseimageurl,
    creator: art.people?.map((p: any) => p.name).join(', ') || 'Unknown',
    source: 'Harvard Art Museums'
  }));

  return [...formattedCleveland, ...formattedHarvard];
};
