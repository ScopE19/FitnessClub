export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    return await event.context.prisma.membership.delete({
      where: { id }
    })
  })