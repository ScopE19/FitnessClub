import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const products = await prisma.product.findMany({
    where: {
      userId: user.id, // возвращаем только свои продукты
    },
    orderBy: {
      createdAt: 'desc', // (если хочешь видеть последние первыми)
    },
  })

  return {
    success: true,
    products,
  }
})
