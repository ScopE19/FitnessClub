import { PrismaClient } from '@prisma/client'
import { defineEventHandler } from 'h3'

let prisma: PrismaClient

export default defineEventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  
  event.context.prisma = prisma
})
