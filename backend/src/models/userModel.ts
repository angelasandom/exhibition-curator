import mongoose from "mongoose";

const ArtworkSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  creator: { type: String, default: 'Unknown' },
  imageUrl: { type: String, required: true },
  culture: String,
  technique: String,
  source: { type: String, required: true }, // 'Harvard Art Museums' o 'The Cleveland Museum of Art'
  type: String
});

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artworks: [ArtworkSchema],
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  email: { type: String, required: true, unique: true },
  displayName: String,
  collections: [CollectionSchema],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);