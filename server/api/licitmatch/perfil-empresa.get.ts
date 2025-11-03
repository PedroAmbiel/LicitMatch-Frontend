export default defineEventHandler(async (event) => {
  const idEmpresa = getQuery(event)['idEmpresa']
  const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/empresa/perfil-empresa` , {
    method: 'GET',
    query:{
      "idEmpresa" : idEmpresa,
    },
    onResponse({ request, response, options }) {
      //console.log("[onResponse]: ", response._data)
    },
    onResponseError({ request, response, options }) {
      // console.log("[onResponseError]: ", response._data)
    }
  })

  return response
})
