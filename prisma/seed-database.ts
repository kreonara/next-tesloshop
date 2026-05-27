// import 'dotenv/config'
// import { Pool } from 'pg';
// import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from "@/src/lib/prisma"
import { initialData } from "./seed"

// const connectionString = process.env.DATABASE_URL
// if (!connectionString) {
//   throw new Error('DATABASE_URL no existe')
// }

// const pool = new Pool({connectionString})
// const adapter = new PrismaPg(pool)
// const prisma = new PrismaClient({ adapter })

async function main() {
  try {
    // BORRAR REGISTROS PREVIOS
    await Promise.all([
      prisma.productImage.deleteMany(),
      prisma.product.deleteMany(),
      prisma.category.deleteMany()
    ])

    const { categories, products } = initialData

    // CATEGORIAS
    // AGREGAR UNA CATEGORIA
    // await prisma.category.create({
    //   data: { name: 'Shirts'}
    // })

    // AGREGAR MUCHAS CATEGORIAS
    const categoriesData = categories.map( category => {
      return {
        name: category
      }
    })
    await prisma.category.createMany({
      data: categoriesData
    })


    // PRODUCTOS
    const categoriesDB = await prisma.category.findMany() // [{'123-456', 'Shirts'}, {...}, {...}, ...]
    const categoriesMap = categoriesDB.reduce( (map, category) => { // map - acumulador, category - elemento actual
      map[category.name.toLowerCase()] = category.id
      return map // retornamos acumulador
    }, {} as Record<string, string>) // <string='Shirts', string='123-456'>




    console.log('Seed ejecutado correctamente')
  } catch (error) {
    console.log(error)
  }
}

(() => {
  if(process.env.NODE_ENV === 'production') return

  main()
    .then( async () => {
      await prisma.$disconnect()
    })
    .catch( async (e) => {
      console.error(e)
      await prisma.$disconnect()

      process.exit(1) // detenemos la ejecución de este script (0. ok, 1. error)
    })
})()