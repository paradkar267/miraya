const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  { name: 'Red Embroidered Lehenga', category: 'Lehenga', price: 85000, image: '/lehenga_mega.png' },
  { name: 'Beige Silk Saree', category: 'Saree', price: 32500, image: '/saree_mega.png' },
  { name: 'Blush Anarkali Set', category: 'Anarkali', price: 28000, image: '/anarkali_mega.png' },
  { name: 'Sage Green Sharara', category: 'Sharara', price: 26000, image: '/sharara_mega.png' },
];

async function main() {
  const count = await prisma.product.count();
  if (count === 0) {
    for (const p of products) {
      await prisma.product.create({ data: p });
    }
    console.log('Database seeded with products!');
  } else {
    console.log('Products already exist.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
