import express from "express";
import { getRandomArtworks } from '../controllers/artworkController';

const router = express.Router();

router.get('/random', getRandomArtworks);

export default router;


