import mongoose from "mongoose";

const ArtworkSchema = new mongoose.Schema({
    apiSource: { tyoe: String, enum: ['cleveland', 'harvard'], required: true },
    id: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    culture: String,
    technique: String,
});

const CollectionSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    userId: { type: String, required: true }, //Firebase UID
    artworks: [ArtworkSchema],
}, { timestamps: true });

export default mongoose.model('Collection', CollectionSchema);
