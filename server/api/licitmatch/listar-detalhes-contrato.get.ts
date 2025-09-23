export default defineEventHandler(async (event) => {
  const idPncp = getQuery(event)['idPncp']


  const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/contratos/detalhes` , {
    method: 'GET',
    query: {
      'idPncp' : idPncp
    },
    onResponse({ request, response, options }) {
      //console.log("[onResponse]: ", response._data)
    },
    onResponseError({ request, response, options }) {
      console.log("[onResponseError]: ", response._data[0])
    }
  })



  return response
})
