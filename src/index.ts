import { createServer } from 'http';
import dotenv from 'dotenv';
// import { router } from './routers/routers.js';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Router } from './routers/router.js';
import { postUser } from './routers/controllers/postUser.js';
import { getAllUsers } from './routers/controllers/getAllUsers.js';
import { getUserById } from './routers/controllers/getUserById.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const router = new Router();


router.get('/api/users', getAllUsers);
router.get('/api/users/:userId', getUserById);
router.post('/api/users',postUser);

console.log(router)

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (!req.url) {
    res.statusCode = 400;
    return res.end('Bad request');
  }
  router.handler(req,res);

});

server.listen(PORT, () => {
  console.log('Server started on port', PORT);
});

