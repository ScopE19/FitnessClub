import { PrismaClient } from '@prisma/client'
import { defineEventHandler } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Optional: Add filtering by type
  const where = query.type ? { type: { contains: query.type.toString() } } : {}
  
  return await prisma.membership.findMany({
    where,
    include: {
      users: {
        include: {
          user: true
        }
      }
    },
    
  })
})