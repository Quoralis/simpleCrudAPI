import request from 'supertest';
import { createServer, Server } from 'node:http';
import { Router } from '../src/routers/router.js';  // импортируем сам класс
import { usersDb } from '../src/db/usersDb.js';
import { getAllUsers } from '../src/routers/controllers/getAllUsers.js';
import { postUser } from '../src/routers/controllers/postUser.js';
import { getUserById } from '../src/routers/controllers/getUserById.js';

let server: Server;

beforeAll(() => {
  const router = new Router();
  router.get('/api/users', getAllUsers);
  router.get('/api/users/:userId', getUserById);
  router.post('/api/users', postUser);

  server = createServer((req, res) => router.handler(req, res));
});

afterAll((done) => {
  if (server.listening) server.close(done);
  else done();
});

describe('Simple CRUD API', () => {
  beforeEach(() => {
    usersDb.length = 0;
  });

  test('GET -> empty array', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST -> create new user', async () => {
    const newUser = { username: 'Stas', age: 33, hobbies: ['PC'] };
    const res = await request(server)
      .post('/api/users')
      .send(newUser)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.username).toBe('Stas');
  });

  test('GET -> return created user', async () => {
    const createRes = await request(server)
      .post('/api/users')
      .send({ username: 'Stas', age: 33, hobbies: ['PC'] })
      .set('Content-Type', 'application/json');

    const id = createRes.body.user.id;
    const res = await request(server).get(`/api/users/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });
});
