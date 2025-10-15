export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/empresa/inscricao`, {
      method: 'POST',
      body,
      onResponse({ request, response, options }) {
        console.log("[onResponse]: ", response._data)
      },
      onResponseError({ request, response, options }) {
        console.log("[onResponseError]: ", response._data)
      }
    })

    return response;
})
