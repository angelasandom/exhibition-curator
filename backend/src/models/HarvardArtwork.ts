import mongoose from "mongoose";

const harvardArtworkSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String },
    people: { type: [String] },
    dated: { type: String },
    medium: { type: String },
    department: { type: String },
    culture: { type: String },
    images: {
        baseimageurl: { type: String, required: true }
    },
    altText: { type: String },
    source: { type: String, default: 'Harvard Art Museums'}
});

export default mongoose.model('HarvardArtwork', harvardArtworkSchema);