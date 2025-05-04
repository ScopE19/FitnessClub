export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const includeClass = typeof query.include === 'string' 
      ? query.include.includes('class.trainer') 
      : false
  
    return await event.context.prisma.schedule.findMany({
      include: {
        class: {
          include: {
            trainer: includeClass
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    })
  })