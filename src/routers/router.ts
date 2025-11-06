import { IncomingMessage, ServerResponse } from 'node:http';
import * as path from 'node:path';

type Handler = (req: IncomingMessage, res: ServerResponse) => void;

export type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Routers = {
  [key in Methods]?: Record<string, Handler>;
}


export class Router {
  private routers: Routers;

  constructor() {
    this.routers = {};
  }

  private addRoute(method: Methods, path: string, handler: Handler) {
    this.routers[method] ??= {};
    this.routers[method]![path] = handler;
    return this;
  }

  get(path: string, handler: Handler): this {
    return this.addRoute('GET', path, handler);
  }

  post(path: string, handler: Handler): this {
    return this.addRoute('POST', path, handler);
  }

  put(path: string, handler: Handler): this {
    return this.addRoute('PUT', path, handler);
  }

  delete(path: string, handler: Handler): this {
    return this.addRoute('DELETE', path, handler);
  }

  handler(req: IncomingMessage, res: ServerResponse) {
    res.setHeader('Content-Type', 'application/json');
    const method = (req.method || 'GET') as Methods;
    const path = req.url || '/'
    const tableMethods = this.routers[method];

    if (!tableMethods) {
      res.statusCode = 405;
      return res.end('Method Not Allowed');
    }

    if (tableMethods[path]) {
      return tableMethods[path](req, res);
    }

    if (path.startsWith('/api/users/')) {
      const userId = path.slice('/api/users/'.length);
      (req as any).params = { userId };
      const dynamicHandler = tableMethods['/api/users/:userId'];
      if (dynamicHandler) {
        return dynamicHandler(req, res);
      }
    }

    res.statusCode = 404;
    res.end('Not Found');
  }



}



