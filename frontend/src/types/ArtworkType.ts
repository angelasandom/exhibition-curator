export interface ArtworkType {
  id: string;
  title: string;
  creator: string;
  imageUrl: string;
  culture?: string;
  technique?: string;
  source: string;
  type?: string;
}

export interface CollectionType {
  _id?: string;
  name: string;
  artworks: ArtworkType[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserType {
  uid: string;
  email: string;
  displayName?: string;
  collections: CollectionType[];
}