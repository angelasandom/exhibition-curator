import { Request, Response } from "express";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { uid, email, displayName } = req.body;

  if (!uid || !email || !displayName) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  try {
    const existing = await User.findOne({ uid });
    if (existing) {
      res.status(200).json({ message: "User already exists." });
      return;
    }

    const newUser = await User.create({ uid, email, displayName });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Server error creating user." });
  }
};
