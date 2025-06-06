import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import artworkRoutes from './routes/artworkRoutes';
import userRoutes from './routes/userRoutes';
import collectionRoutes from "./routes/collectionRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('No MongoDB URI found in .env');
  process.exit(1);
}

app.use(cors({
  origin: ['http://localhost:5173', 'https://exhibition-curator-art-gallery.netlify.app'],
  credentials: true
}));

app.use(express.json());

app.use('/api/artworks', artworkRoutes);

app.use("/api", userRoutes);

app.use("/api/collections", collectionRoutes); 

app.get('/', (_req, res) => {
  res.send('Backend is working');
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB is connected');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
