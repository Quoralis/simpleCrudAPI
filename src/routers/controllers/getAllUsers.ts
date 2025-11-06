import { IncomingMessage, ServerResponse } from 'node:http';
import { usersDb } from '../../db/usersDb.js';

export function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = 200;
  res.end(JSON.stringify(usersDb));
  return;
}
