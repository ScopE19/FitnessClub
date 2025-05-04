export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    return await event.context.prisma.trainer.findMany({
      include: {
        classes: query.include === 'classes'
      }
    })
  })