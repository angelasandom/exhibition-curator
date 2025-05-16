import mongoose from "mongoose";

const ArtworkSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    creator: { type: String },
    imageUrl: { type: String, required: true },
    culture: String,
    technique: String,
    apiSource: { type: String, enum: ['The Cleveland Museum of Art', 'Harvard Art Museums'], required: true }
});

const CollectionSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    userId: { type: String, required: true }, //Firebase UID
    artworks: [ArtworkSchema],
}, { timestamps: true });

export default mongoose.model('Collection', CollectionSchema);
