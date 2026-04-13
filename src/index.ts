import { Hono } from 'hono'

// Type definitions
interface User {
  id: string
  name: string
  email: string
  password: string
}

interface SignupBody {
  name: string
  email: string
  password: string
}

interface SigninBody {
  email: string
  password: string
}

// In-memory user store with default users
const users: User[] = [
  {
    id: 'user_1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'password123',
  },
  {
    id: 'user_2',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password456',
  },
  {
    id: 'user_3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'password789',
  },
]

// Helper function to generate unique ID
function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

const app = new Hono()

// GET /users - Get all users
app.get('/users', (c) => {
  // Return users without passwords
  const safeUsers = users.map(({ password, ...user }) => user)
  return c.json(safeUsers)
})

// GET /users/:id - Get user by ID
app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  const user = users.find((u) => u.id === id)

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  // Return user without password
  const { password, ...safeUser } = user
  return c.json(safeUser)
})

// POST /signup - Create new user
app.post('/signup', async (c) => {
  const body = await c.req.json<SignupBody>()

  // Validate required fields
  if (!body.name || !body.email || !body.password) {
    return c.json({ error: 'Name, email, and password are required' }, 400)
  }

  // Check for duplicate email
  const existingUser = users.find((u) => u.email === body.email)
  if (existingUser) {
    return c.json({ error: 'Email already exists' }, 409)
  }

  // Create new user
  const newUser: User = {
    id: generateId(),
    name: body.name,
    email: body.email,
    password: body.password,
  }

  users.push(newUser)

  // Return user without password
  const { password, ...safeUser } = newUser
  return c.json(safeUser, 201)
})

// POST /signin - Login user
app.post('/signin', async (c) => {
  const body = await c.req.json<SigninBody>()

  // Validate required fields
  if (!body.email || !body.password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }

  // Find user by email
  const user = users.find((u) => u.email === body.email)

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  // Validate password
  if (user.password !== body.password) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  // Return success message with user data (without password)
  const { password, ...safeUser } = user
  return c.json({
    message: 'Signin successful',
    user: safeUser,
  })
})

export default app
