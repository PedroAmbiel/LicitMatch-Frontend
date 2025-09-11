export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/user/signup`, {
    method: 'POST',
    body,
    onResponse({ request, response, options }) {
      console.log("[onResponse]: ", response._data)
    },
    onResponseError({ request, response, options }) {
      console.log("[onResponseError]: ", response._data[0].property)
      throw new Error(response._data[0].property)
    }
  })



  return response
})
