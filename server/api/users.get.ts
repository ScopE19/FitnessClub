export default defineEventHandler(async (event) => {
    return await event.context.prisma.user.findMany({
      where: {
        memberships: {
          some: {} // Only users with memberships
        }
      },
      include: {
        memberships: {
          include: {
            membership: true // Include membership details
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })
  })