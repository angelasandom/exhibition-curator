import express from "express";
import { getRandomArtworks, searchArtworks } from '../controllers/artworkController';

const router = express.Router();

router.get('/random', getRandomArtworks);

router.get('/search', searchArtworks);

export default router;

