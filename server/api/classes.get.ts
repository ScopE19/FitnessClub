export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const include = {
      trainer: false,
      schedules: false
    }
  
    if (typeof query.include === 'string') {
      include.trainer = query.include.includes('trainer')
      include.schedules = query.include.includes('schedules')
    }
  
    return await event.context.prisma.class.findMany({
      include
    })
  })