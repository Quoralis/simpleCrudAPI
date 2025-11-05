import { User, usersDb } from '../db/usersDb.js';
import { IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';

export function router(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const method = req.method || 'GET';
    const url = req.url || '/';
    switch (url) {
      case '/api/users': {
        switch (method) {
          case 'GET': {
            res.statusCode = 200;
            res.end(JSON.stringify(usersDb));
            return;
          }

          case 'POST': {
            let body = '';

            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', () => {
              try {
                const parsed: User = JSON.parse(body);
                parsed.id  = randomUUID()
                usersDb.push(parsed);

                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'User added', user: parsed }));
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });

            return;
          }

          default:
            res.statusCode = 405;
            res.end(JSON.stringify({ error: 'Method Not Allowed' }));
            return;
        }
      }

      default:
        res.statusCode = 404;
        res.end('<h1>404 Not Found</h1>');
        return;
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}
