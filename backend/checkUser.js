const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

p.user.findMany({ where: { email: 'yashparadkar63@gmail.com' } })
  .then(users => {
    console.log('DB Users found:', users.length);
    console.log(JSON.stringify(users, null, 2));
  })
  .catch(e => console.error('DB ERROR:', e.message))
  .finally(() => p.$disconnect());
