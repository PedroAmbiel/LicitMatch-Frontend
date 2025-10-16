export default defineEventHandler(async (event) => {
  const idPncp = getQuery(event)['idPncp']
  const idEmpresa = getQuery(event)['idEmpresa']

  const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/contratos/detalhesinscrito` , {
    method: 'GET',
    query: {
      'idPncp' : idPncp,
      'idEmpresa': idEmpresa
    },
    onResponse({ request, response, options }) {
      //console.log("[onResponse]: ", response._data)
    },
    onResponseError({ request, response, options }) {
      // console.log("[onResponseError]: ", response._data[0])
    }
  })



  return response
})
