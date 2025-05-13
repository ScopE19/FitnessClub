import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, membershipId } = body

  if (!userId || !membershipId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing userId or membershipId' })
  }

  // Optional: check if the user already has an active membership
  const existing = await prisma.userMembership.findFirst({
    where: {
      userId,
      endDate: {
        gte: new Date(), // still valid
      },
    },
  })

  if (existing) {
    throw createError({ statusCode: 400, statusMessage: 'User already has an active membership' })
  }

  const now = new Date()

  // Get duration of the selected membership
  const membership = await prisma.membership.findUnique({
    where: { id: membershipId },
  })

  if (!membership) {
    throw createError({ statusCode: 404, statusMessage: 'Membership not found' })
  }

  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + membership.duration)

  const userMembership = await prisma.userMembership.create({
    data: {
      userId,
      membershipId,
      startDate: now,
      endDate,
    },
  })

  return userMembership
})
