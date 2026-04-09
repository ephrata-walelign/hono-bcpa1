import { Hono } from 'hono'

const app = new Hono()

type users={
  id: String | Number,
  name: String,
  email: String,
  password: String | Number
}

const users: users[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "alice123"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    password: 987654
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    password: "charlieSecure!"
  },
  {
    id: 4,
    name: "Dana White",
    email: "dana.white@example.com",
    password: 246810
  },
  {
    id: 5,
    name: "Ethan Clark",
    email: "ethan.clark@example.com",
    password: "ethanPass2026"
  }
];

app.get('/', (c) => {
  return c.text("hello world.")
})

app.get('/users', (c) => {
  return c.json(users)
})

app.get('/users/:id', (c) => {
  const id = Number(c.req.param('id'));
  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      foundUser = users[i];
      break;
    }
  }
  if (!foundUser) {
    return c.json(
      { message: "User not found" },
      404
    );
  }
  return c.json(foundUser);
})

app.post('/signup', async (c) =>{
  const body = await c.req.json()

  const { name, email, password } = body

  if(!name || !email || !password){
    return c.json({Message: 'All fiels are required'}, 400)
  }

  const existingUser = users.find(u => u.email === email)
  if (existingUser){
    return c.json({message:'User already exists' }, 409)
  }

  const newUser: users = {
    id: users.length + 1,
    name,
    email,
    password
  }
  users.push(newUser)
  const { password: _, ...userWithoutPassword } = newUser
  
  return c.json(userWithoutPassword, 201)
})

app.post('/signin', async (c) =>{
  const body = await c.req.json()
  const { email, password } = body

  if(!email || !password) {
    return c.json({ message: 'Email and passwird are required' }, 400)
  }
  const user = users.find(u => u.email === email)

  if(!user){
    return c.json({ message: 'user not found' }, 401)
  }

  if(user.password !== password){
    return c.json({message:'Invalid password.' }, 401)
  }

  const {password: _, ...userWithoutPassword } = user

  return c.json({
    message: 'Login successful.',
    user: userWithoutPassword
  })
})

export default app
