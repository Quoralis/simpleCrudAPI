import { createServer } from 'http';
import dotenv from 'dotenv';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Router } from './routers/router.js';
import { postUser } from './routers/controllers/postUser.js';
import { getAllUsers } from './routers/controllers/getAllUsers.js';
import { getUserById } from './routers/controllers/getUserById.js';
import { putUserById } from './routers/controllers/putUserById.js';
import { deleteUserById } from './routers/controllers/deleteUserById.js';
import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';

dotenv.config();
const PORT = process.env.PORT || 3000;

export const router = new Router();

router.get('/api/users', getAllUsers);
router.get('/api/users/:userId', getUserById);
router.post('/api/users', postUser);
router.put('/api/users/:userId', putUserById);
router.delete('/api/users/:userId', deleteUserById);

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);
  console.log(`Starting ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died (code=${code}, signal=${signal})`);
    cluster.fork();
  });

} else {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    try {
      if (!req.url) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Bad request' }));
      }
      router.handler(req, res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  });

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}
