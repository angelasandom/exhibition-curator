import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app =express();

app.use(express.json());

const mongoDBUri = process.env.MONGODB_URI;

if (!mongoDBUri) {
  console.error('No MongoDB URI in .env');
  process.exit(1); 
}

mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Error connecting MongoDB:', err));

  
  //example rute
  app.get('/', (req, res) => {
  res.send('Backend is working');
  });
  
  //port
  
  const port = parseInt(process.env.PORT || '5000', 10);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
