import express, { Request, Response } from "express";

import { authenticateUser } from "../middleware/firebaseAuth";
import User from "../models/userModel";

const router = express.Router();

router.get("/", authenticateUser, async (req: Request, res: Response): Promise<void> => {
  try {

    const userId = req.user?.uid;
    
    const user = await User.findOne({ uid: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user.collections);

  } catch (err) {
    console.error("Error fetching collections:", err);
    res.status(500).json({ message: "Error fetching collections ", error: err });
  }
});

router.post("/", authenticateUser, async  (req: Request, res: Response): Promise<void> => {
  try {

    const userId =req.user?.uid;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Coollection name required" });
      return;
    }

    const user = await User.findOne({ uid: userId });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const existingCollection = user.collections.find((col: any) => col.name === name);
    if (existingCollection) {

      res.status(400).json({ message: "Collection with this name already exists" });
      return;
    }

    user.collections.push({ name, artworks: [] } as any);
    await user.save();


    res.status(201).json(user.collections);
  } catch (err) {
    console.error("Error creating collection:", err);
    res.status(500).json({ message: "Error creating collection", error: err });
  }
});


router.post("/add-artwork", authenticateUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;
    const { collectionName, artwork } = req.body;

    if (!collectionName || !artwork) {
      res.status(400).json({ message: "Collection name and artwork are required" });
      return;
    }

    const user = await User.findOne({ uid: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const collection = user.collections.find((col: any) => col.name === collectionName);
    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    const existingArtwork = (collection as any).artworks.find((art: any) => art.id === artwork.id);
    if (existingArtwork) {
      res.status(400).json({ message: "Artwork already exists in collection" });
      return;
    }

    (collection as any).artworks.push(artwork);
    await user.save();

    res.status(200).json(collection);
  } catch (err) {
    console.error("Error adding artwork:", err);
    res.status(500).json({ message: "Error adding artwork", error: err });
  }
});

router.post("/remove-artwork", authenticateUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;
    const { collectionName, artworkId } = req.body;

    if (!collectionName || !artworkId) {
      res.status(400).json({ message: "Collection name and artwork ID are require" });

      return;
    }

    const user = await User.findOne({ uid: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const collection = user.collections.find((col: any) => col.name === collectionName);
    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    const initialLength = (collection as any).artworks.length;
    (collection as any).artworks = (collection as any).artworks.filter((art: any) => art.id !== artworkId);

    if ((collection as any).artworks.length === initialLength) {
      res.status(404).json({ message: "Artwork not found in collection" });
      return;
    }

    await user.save();

    res.status(200).json(collection);
  } catch (err) {
    console.error("Error removing artwork:", err);
    res.status(500).json({ message: "Error removing artwork", error: err });
  }
});

router.delete ("/:collectionName", authenticateUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid;
    const { collectionName } = req.params;

    if (!collectionName) {
      res.status(400).json({ message: "Collection name is required" });
      return;
    }

    const user = await User.findOne({ uid: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const collectionIndex = user.collections.findIndex((col: any) => col.name === collectionName);
    if (collectionIndex === -1) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    user.collections.splice(collectionIndex, 1);
    await user.save();

    res.status(200).json({ 
      message: `Collection "${collectionName}" deleted successfully`,
      collections: user.collections 
    });
  } catch (err) {
    console.error("Error deleting collection:", err);
    res.status(500).json({ message: "Error deleting collection.", error: err });
  }
  
});

export default router;