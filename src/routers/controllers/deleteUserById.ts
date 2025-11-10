import { IncomingMessage, ServerResponse } from 'node:http';
import { validate as validateUUID } from 'uuid';
import { usersDb } from '../../db/usersDb.js';

export function deleteUserById(req: IncomingMessage, res: ServerResponse) {
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

  usersDb.splice(index, 1);

  res.statusCode = 204;
  res.end()
  return
}
