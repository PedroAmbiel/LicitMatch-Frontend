export default defineEventHandler(async (event) => {
  const qtdRegistros = getQuery(event)['qtdRegistros']
  const pagina = getQuery(event)['paginacao']

  const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/contratos/listar_todos` , {
    method: 'GET',
    query: {
      'paginacao' : pagina,
      'qtdRegistros': qtdRegistros
    },
    onResponse({ request, response, options }) {
      console.log("[onResponse]: ", response._data)
    },
    onResponseError({ request, response, options }) {
      console.log("[onResponseError]: ", response._data[0])
    }
  })



  return response
})
