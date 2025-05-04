export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    const body = await readBody(event)
    return await event.context.prisma.membership.update({
      where: { id },
      data: body
    })
  })