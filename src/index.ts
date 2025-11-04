import { createServer } from 'http';
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  res.end('Server is running');
});

server.listen(PORT, () => {
  console.log('Server started on port', PORT);
});