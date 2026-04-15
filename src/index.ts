import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const users: User[] = [
  {
     id: "1",
    name: "Ephrata",
    email: "Ephrata.w1@gmail.com",
    password: "1234"
  },
  {
      id: "2",
    name: "Amen",
    email: "Amen.w1@gmail.com",
    password: "weq123"
  }
]

app.get('/users', (c) => {
  return c.json(users);
});

app.get('/users/:id', (c) => {
  const id = c.req.param('id');

  const user = users.find((u) => u.id === id);

  if (!user) {
    return c.json({ message: 'User not found' }, 404);
  }

  return c.json(user);
});

app.post('/signup', async (c) => {
  const body = await c.req.json();
  const { name, email, password } = body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return c.json({ message: 'Email already exists' }, 400);
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
  };

  users.push(newUser);

  const { password: _, ...safeUser } = newUser;

  return c.json(safeUser);
});

app.post('/signin', async (c) => {
  const body = await c.req.json();
  const { email, password } = body;

  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return c.json({ message: 'Invalid credentials' }, 401);

  }

const { password: _, ...safeUser } = user;

return c.json({
  message: 'Login successful',
  user: safeUser,
});
});

export default app
