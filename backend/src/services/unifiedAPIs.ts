import axios from 'axios';

export const fetchRandomUnifiedArtworks = async () => {
  const artworks: any[] = [];

  const fetchHarvard = async () => {
    const res = await axios.get('https://api.harvardartmuseums.org/object', {
      params: {
        apikey: process.env.HARVARD_API_KEY,
        hasimage: 1,
        size: 5,
        sort: 'random'
      }
    });
    return res.data.records
      .filter((art: any) => art.baseimageurl || art.primaryimageurl)
      .map((art: any) => ({
      id: art.id,
      title: art.title,
      imageUrl: art.baseimageurl || art.primaryimageurl,
      creator: art.people?.map((p: any) => p.name).join(', ') || 'Unknown',
      source: 'Harvard Art Museums'
}));
  };

  const fetchCleveland = async () => {
  const res = await axios.get('https://openaccess-api.clevelandart.org/api/artworks', {
    params: {
      limit: 60,
      has_image: 1,
    }
  });

  const formatted = res.data.data
    .filter((art: any) => art.images?.web?.url)
    .map((art: any) => ({
      id: art.id,
      title: art.title,
      imageUrl: art.images.web.url,
      creator: art.creators?.map((c: any) => c.description).join(', ') || 'Unknown',
      source: 'The Cleveland Museum of Art'
    }));

  // Get random artwork from CLeveland
  const shuffled = formatted.sort(() => 0.5 - Math.random()).slice(0, 5);
  return shuffled;
};


let attempts = 0;
while (artworks.length < 20 && attempts < 5) {
  const [cleveland, harvard] = await Promise.all([fetchCleveland(), fetchHarvard()]);
  const combined = [...cleveland, ...harvard];

  for (const art of combined) {
    if (artworks.length >= 20) break;
    if (!artworks.some(a => a.id === art.id)) {
      artworks.push(art);
    }
  }

  attempts++;
}
//Mix artworks from both APIs
artworks.sort(() => Math.random() - 0.5);

  return artworks;
};
