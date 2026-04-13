# 🔐 Auth API

A simple authentication API built with [Hono]

---

## Quick Start

### Install Dependencies

```bash
bun install
```

### Run the Server

```bash
bun run dev
```

The server will start at **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Welcome message & API info |
| `GET` | `/users` | Get all users |
| `GET` | `/users/:id` | Get user by ID |
| `POST` | `/signup` | Create new user |
| `POST` | `/signin` | Authenticate user |

---

## Usage
### Option 1: 

### Get All Users, directly open this url in a browser  

```bash
http://localhost:3000/users
```

### Get User by ID, directly open this url in a browser

```bash
http://localhost:3000/users/id
```

### Signup (Create Account)

```bash
Invoke-RestMethod -Method Post -Uri http://localhost:3000/signup -ContentType "application/json" -Body '{"name":"John Doe","email":"john@example.com","password":"secret123"}'
```

### Signin (Login)

```bash
Invoke-RestMethod -Method Post -Uri http://localhost:3000/signin -ContentType "application/json" -Body '{"email":"john@example.com","password":"secret123"}'
```

---
### Option 2: Thunder Client (VS Code Extension)

#### Install Thunder Client
1. Open VS Code
2. Press `Ctrl + Shift + X` to open Extensions
3. Search for "Thunder Client"
4. Click Install

#### Use Thunder Client

**For Signup:**
1. Click the Thunder Client icon in VS Code sidebar (lightning bolt ⚡)
2. Click "New Request"
3. Set Method: `POST`
4. Set URL: `http://localhost:3000/signup`
5. Click **Body** tab
6. Select **JSON** from dropdown
7. Enter this JSON:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```
8. Click "Send"

**For Signin:**
1. Click "New Request"
2. Set Method: `POST`
3. Set URL: `http://localhost:3000/signin`
4. Click **Body** tab
5. Select **JSON** from dropdown
6. Enter this JSON:
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```
7. Click "Send"

**For GET Requests (Users):**
1. Click "New Request"
2. Set Method: `GET`
3. Set URL: `http://localhost:3000/users` or `http://localhost:3000/users/1`
4. Click "Send"

---

## 📋 Default Users

The API comes with 3 pre-seeded users for testing:

| ID | Name | Email | Password |
|----|------|-------|----------|
| 1 | Alice Smith | alice@example.com | password123 |
| 2 | Bob Johnson | bob@example.com | password456 |
| 3 | Charlie Brown | charlie@example.com | password789 |

