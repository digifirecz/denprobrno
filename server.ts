import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: "gen-lang-client-0680928943.firebasestorage.app"
  });
}
const bucket = admin.storage().bucket();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use memory storage for Buffer-based upload
  const upload = multer({ storage: multer.memoryStorage() });

  app.use(express.json());

  // API Route for file uploads to Firebase Storage
  app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { buffer, originalname, mimetype } = req.file;
    const fileName = `uploads/${Date.now()}_${originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase()}`;
    const file = bucket.file(fileName);

    try {
      await file.save(buffer, {
        metadata: { contentType: mimetype },
        public: true // Make file public
      });

      const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      res.json({ url });
    } catch (err: any) {
      console.error('Firebase upload error:', err);
      res.status(500).json({ error: 'Failed to upload to Firebase.' });
    }
  });

  // API health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
