export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const query = body.query
    
    if (!query) throw createError({ statusCode: 400, message: 'Query is required' })
  
    // Use raw query for EXPLAIN ANALYZE
    const result = await event.context.prisma.$queryRawUnsafe(
      `EXPLAIN ANALYZE ${query}`
    )
  
    return {
      query,
      analysis: result
    }
  })