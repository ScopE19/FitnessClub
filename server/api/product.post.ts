import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const user = event.context.user

  // Логируем что пришло в контексте
  console.log('📦 Контекст юзера на product.post.ts:', user)

  if (!user || !user.id) {
    console.warn('⚠️ Ошибка авторизации: пользователь в контексте отсутствует')
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - пользователь не найден',
    })
  }

  const body = await readBody(event)

  if (!body.title || typeof body.price !== 'number') {
    console.warn('⚠️ Неверные данные продукта:', body)
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing title or price',
    })
  }

  const product = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description || '',
      price: body.price,
      user: {
        connect: { id: user.id } // 🔥 Правильная привязка
      }
    },
  })

  console.log('✅ Продукт успешно создан:', product)

  return {
    success: true,
    product,
  }
})
