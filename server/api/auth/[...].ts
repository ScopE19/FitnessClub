import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const runtimeConfig = useRuntimeConfig()
const prisma = new PrismaClient()

export default NuxtAuthHandler({
  pages: {
    signIn: '/login',
    newUser: '/', 
  },
  session: {
    strategy: "jwt", // Стратегия JWT, как ты хотел
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id // при логине зашиваем id в токен
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id
      }

      // Безопасная проверка, чтобы избежать 500 ошибки
      if (session?.user?.email) {
        try {
          const me = await $fetch('/api/me', {
            method: 'POST',
            query: {
              API_ROUTE_SECRET: runtimeConfig.API_ROUTE_SECRET,
            },
            body: {
              email: session.user.email,
            },
          })

          if (me?.subscribed !== undefined) {
            session.subscribed = me.subscribed
          }
        } catch (e) {
          console.warn('⚠️ Ошибка получения /api/me:', e.message)
          // просто логируем, ничего не ломаем
        }
      } else {
        console.warn('⚠️ Нет email в session.user — пропускаем fetch /api/me')
      }

      return session
    },
  },

  providers: [
    GithubProvider.default({
      clientId: runtimeConfig.public.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.public.GITHUB_CLIENT_SECRET,
    }),

    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error('User not found or no password')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Invalid password')
        }

        console.log('✅ Авторизованный пользователь из Prisma:', {
          id: user.id,
          email: user.email,
          name: user.name,
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image || null,
        }
      }
    }),
  ],
})
