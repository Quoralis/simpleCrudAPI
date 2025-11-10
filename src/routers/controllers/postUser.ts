import { User, usersDb } from '../../db/usersDb.js';
import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuid } from 'uuid';


export function postUser(req: IncomingMessage, res: ServerResponse) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      const parsed: User = JSON.parse(body);
      if (typeof parsed.username !== 'string' ||
        typeof parsed.age !== 'number' ||
        !Array.isArray(parsed.hobbies)
      ) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Missing or invalid fields' }));
        return;
      }
      parsed.id = uuid();
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