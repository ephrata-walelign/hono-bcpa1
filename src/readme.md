to start program: user "bun run dev"
/: -  redirect to welcome page
/users: - list all users 
/users/id: - get user by id 
signup command: - Invoke-RestMethod -Method Post -Uri http://localhost:3000/signup -ContentType "application/json" -Body '{"name":"Test","email":"test@test.com","password":"123"}'
----------------
singin command: - Invoke-RestMethod -Method Post -Uri http://localhost:3000/signin -ContentType "application/json" -Body '{"email":"alice@example.com","password":"password123"}'
