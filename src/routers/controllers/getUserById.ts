import { IncomingMessage, ServerResponse } from 'node:http';
import { usersDb } from '../../db/usersDb.js';
import { validate } from 'uuid';

export function getUserById(req: IncomingMessage, res: ServerResponse) {
  const { userId } = (req as any).params;

  if (!validate(userId)) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'Invalid userId' }));
  }

  const user = usersDb.find((u) => u.id === userId);
  if (!user) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: 'User not found' }));
  }

  res.statusCode = 200;
  res.end(JSON.stringify(user));
}
