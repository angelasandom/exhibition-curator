import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";


import User from "../models/userModel";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : require('../config/firebaseServiceAccountKey.json');

if (!admin.apps.length) {

  admin.initializeApp({
    credential : admin.credential.cert(serviceAccount),
  });
}

export const authenticateUser = async (req:Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken.email) {
      res.status(401).json({ message: "Email not found in token" });

      return;
    }

    let user = await User.findOne ({ uid: decodedToken.uid });
    
    if (!user) {
      user = new User({
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name  || null,
        collections: []
      });

      await user.save();
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email ,
      displayName: decodedToken.name || null
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized" }

    );
  }
};