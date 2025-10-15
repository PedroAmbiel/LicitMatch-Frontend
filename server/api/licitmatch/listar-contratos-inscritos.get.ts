export default defineEventHandler(async (event) => {
  const situacao = getQuery(event)['situacao']
  const idEmpresa = getQuery(event)['idEmpresa']
  const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/contratos/bucarinscritos` , {
    method: 'GET',
    query: {
      'situacao': situacao,
      'idEmpresa' : idEmpresa
    },
  })



  return response
})