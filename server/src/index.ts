import express from 'express';
import { authRoutes } from './routes/auth.routes.js';
import { prisma } from './prisma.js';

const PORT = 8000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', authRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(async () => {
    console.log('HTTP server closed');
    await prisma.$disconnect();
  });
});

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};
