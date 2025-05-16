export interface ArtworkType {
  id: string;
  title: string;
  imageUrl: string;
  creator: string;
  culture?: string;
  technique?: string;
  source: 'The Cleveland Museum of Art' | 'Harvard Art Museums';
}
