# 🧩 Simple CRUD API

A simple RESTful API built with **Node.js (v24+)** and **TypeScript**.  
The application provides basic CRUD operations for managing users stored in an in-memory database.

---

## 🚀 Features

- **GET /api/users** – returns all users  
- **GET /api/users/{userId}** – returns user by ID  
- **POST /api/users** – creates a new user  
- **PUT /api/users/{userId}** – updates existing user  
- **DELETE /api/users/{userId}** – deletes user  
- Returns proper status codes and JSON messages  
- Handles invalid UUIDs, missing fields, and non-existent routes  
- Supports `.env` configuration and multiple running modes

---

## ⚙️ Requirements

- **Node.js** version **24.10.0** or higher  
- **npm**

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
---

## 🧰 Scripts

| Command | Description |
|----------|--------------|
| `npm run start:dev` | Run in development mode with **nodemon** or **ts-node-dev** |
| `npm run start:prod` | Build and run compiled JS from `dist/` |
---

## 🧠 Usage Examples

### ▶️ Run server
```bash
npm run start:dev
```

### 🧪 API Examples

#### Create user
```bash
curl -X POST http://localhost:4000/api/users   -H "Content-Type: application/json"   -d '{"username":"John","age":25,"hobbies":["reading","music"]}'
```

#### Get all users
```bash
curl http://localhost:4000/api/users
```

#### Get user by ID
```bash
curl http://localhost:4000/api/users/<uuid>
```

#### Update user
```bash
curl -X PUT http://localhost:4000/api/users/<uuid>   -H "Content-Type: application/json"   -d '{"username":"Updated John","age":30,"hobbies":["coding","chess"]}'
```

#### Delete user
```bash
curl -X DELETE http://localhost:4000/api/users/<uuid>
```

---

## 🧾 Response Codes

| Code | Meaning |
|------|----------|
| **200** | OK – successful request |
| **201** | Created – new record added |
| **204** | No Content – record deleted |
| **400** | Bad Request – invalid UUID or incorrect body |
| **404** | Not Found – user or route doesn’t exist |
| **405** | Method Not Allowed – unsupported method |
| **500** | Internal Server Error |

---
## 🧩 Tests (example scenarios)

1. `GET /api/users` → returns empty array  
2. `POST /api/users` → creates a new user  
3. `GET /api/users/{id}` → returns created user  
4. `PUT /api/users/{id}` → updates user  
5. `DELETE /api/users/{id}` → deletes user  
6. `GET /api/users/{id}` → returns 404 (deleted)
---
