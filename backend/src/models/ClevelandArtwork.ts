import mongoose from 'mongoose';

const clevelandArtworkSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true},
  title: { type: String },
  creators: { type: [String]},
  creation_date: { type: String },
  medium: { type: String },
  departament: { type: String },
  culture: { type: String },
  images: {
    web: {
      url: { type: String, required: true }
    }
  },
  altText: { type: String },
  source: { type: String, default: 'The Cleveland Museum of Art'}
});

export default mongoose.model('ClevelandArtwork', clevelandArtworkSchema);