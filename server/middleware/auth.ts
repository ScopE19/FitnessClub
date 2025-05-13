import { getServerSession } from '#auth'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  if (session?.user) {
    event.context.user = {
      id: (session.user as any).id, // 👈 исправляем типизацию
      email: session.user.email,
      name: session.user.name,
      image: session.user.image || null,
      role: session.user.role || null,
    }

    console.log('✅ Контекст юзера на сервере:', event.context.user)
  } 
})
