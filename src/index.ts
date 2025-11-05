import { createServer } from 'http';
import dotenv from 'dotenv'
import { router } from './routers/routers.js';
import { IncomingMessage, ServerResponse } from 'node:http';
dotenv.config()
const PORT = process.env.PORT || 3000;

const server = createServer((req:IncomingMessage, res:ServerResponse) => {
  if(req.url === undefined) return null
  router(req,res)

});

server.listen(PORT, () => {
  console.log('Server started on port', PORT);
});

