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
    // await Promise.all([
      await prisma.productImage.deleteMany()
      await prisma.product.deleteMany()
      await prisma.category.deleteMany()
      await prisma.user.deleteMany()
    // ])

    const { categories, products, users } = initialData

    await prisma.user.createMany({
      data: users
    })

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

    products.forEach( async(product) => {
      const { type, images, ...rest} = product
      const dbProduct = await prisma.product.create({
        data: {
          ...rest,
          categoryId: categoriesMap[type]
        }
      })

      // IMAGES
      const imagesData = images.map( image => ({
        url: image,
        productId: dbProduct.id
      }))

      await prisma.productImage.createMany({
        data: imagesData
      })
    })





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