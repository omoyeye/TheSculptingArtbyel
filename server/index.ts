import express, { Express, Request, Response } from "express";
import registerRoutes from "./routes";
// import { setupVite, serveStatic, log } from "./vite";
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(registerRoutes);

const PORT = process.env.PORT || 3001;

const distPath = path.resolve(__dirname, '../../dist/public');
const clientTemplate = path.resolve(
  __dirname,
  "..",
  "..",
  "dist",
  "public",
  "index.html",
);
app.use(express.static(distPath));

// fall through to index.html if the file doesn't exist
app.use((req, res) => {
    res.sendFile(clientTemplate);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});