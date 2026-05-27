import 'dotenv/config'
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

// 1. Creamos una función que inicializa Prisma con el adaptador exactamente igual que en tu seed
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL no existe')
  }
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  // Puedes agregar { log: ['query'] } aquí adentro si quieres ver las consultas en la terminal
  return new PrismaClient({ adapter }); 
};

// 2. Le decimos a TypeScript que el objeto global va a tener nuestra instancia de Prisma
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// 3. Verificamos si ya existe una instancia global. Si no existe, la creamos.
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// 4. En desarrollo, guardamos la instancia en el objeto global para evitar múltiples conexiones
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}