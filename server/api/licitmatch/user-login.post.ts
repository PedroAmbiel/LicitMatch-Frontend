export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/user/auth`, {
    method: 'POST',
    body,
  })



  return response
})
