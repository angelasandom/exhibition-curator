export interface Artwork {
  id: string;
  title: string;
  creator: string;
  imageUrl: string;
  culture?: string;
  technique?: string;
  apiSource: 'The Cleveland Museum of Art' | 'Harvard Art Museums';
}
