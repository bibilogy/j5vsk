// test-prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const grades = await prisma.grades.findMany();
  console.log(grades);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
