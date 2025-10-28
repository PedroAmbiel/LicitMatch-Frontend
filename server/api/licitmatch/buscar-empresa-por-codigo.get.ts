export default defineEventHandler(async (event) => {
  const codigo = getQuery(event)['codigo']
  const senha = getQuery(event)['senha']
  const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/empresa/buscarempresacodigo` , {
    method: 'GET',
    query: {
      'codigo': codigo,
      'senha' : senha
    },
  })



  return response
})