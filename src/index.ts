import { Hono } from 'hono'

// Type definitions
interface User {
  id: number
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


let nextId = 4

const users: User[] = [
  {
    id: 1,
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'password123',
  },
  {
    id: 2,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password456',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'password789',
  },
]


function generateId(): number {
  return nextId++
}

const app = new Hono()

// Welcome message
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to the Auth API!'
    
  })
})


app.post('/signup', async (c) => {
  let body: SignupBody
  try {
    body = await c.req.json<SignupBody>()
  } catch (e) {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  
  if (!body.name || !body.email || !body.password) {
    return c.json({ error: 'Name, email, and password are required' }, 400)
  }

  
  const existingUser = users.find((u) => u.email === body.email)
  if (existingUser) {
    return c.json({ error: 'Email already exists' }, 409)
  }

  
  const newUser: User = {
    id: generateId(),
    name: body.name,
    email: body.email,
    password: body.password,
  }

  users.push(newUser)

  
  const { password, ...safeUser } = newUser
  return c.json(safeUser, 201)
})


app.post('/signin', async (c) => {
  let body: SigninBody
  try {
    body = await c.req.json<SigninBody>()
  } catch (e) {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  
  if (!body.email || !body.password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }

  
  const user = users.find((u) => u.email === body.email)

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  
  if (user.password !== body.password) {
    return c.json({ error: 'Incorrect password' }, 401)
  }

  
  const { password, ...safeUser } = user
  return c.json({
    message: 'Signin successful',
    user: safeUser,
  })
})


app.get('/users', (c) => {
  
  const safeUsers = users.map(({ password, ...user }) => user)
  return c.json(safeUsers)
})

app.get('/users/:id', (c) => {
  const id = Number(c.req.param('id'))
  const user = users.find((u) => u.id === id)

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  
  const { password, ...safeUser } = user
  return c.json(safeUser)
})

export default app
