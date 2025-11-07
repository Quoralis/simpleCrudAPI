import { IncomingMessage, ServerResponse } from 'node:http';
import { usersDb, User } from '../../db/usersDb.js';
import { validate as validateUUID } from 'uuid';

export function putUserById(req: IncomingMessage, res: ServerResponse) {
  const { userId } = (req as any).params;
  if (!validateUUID(userId)) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'Invalid userId' }));
  }
  const index = usersDb.findIndex((u) => u.id === userId);
  if (index === -1) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: 'User not found' }));
  }
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const parsed: User = JSON.parse(body);

      if (
        typeof parsed.username !== 'string' ||
        typeof parsed.age !== 'number' ||
        !Array.isArray(parsed.hobbies)
      ) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Missing or invalid fields' }));
      }

      const updatedUser: User = {
        id: userId,
        username: parsed.username,
        age: parsed.age,
        hobbies: parsed.hobbies,
      };

      usersDb[index] = updatedUser;

      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'User updated', user: updatedUser }));
    } catch {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}
