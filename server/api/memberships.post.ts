import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const membership = await prisma.membership.create({
    data: {
      type: body.type,
      price: body.price,
      duration: body.duration,
    },
  })

  return membership
})