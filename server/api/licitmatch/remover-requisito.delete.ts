export default defineEventHandler(async (event) => {
    const idRequisito = getQuery(event)['idRequisito']

    const response = await event.$fetch(`http://localhost:8080/LicitMatch/api/v1/contratos/removerrequisito`, {
      method: 'DELETE',
      query:{
        "idRequisito" : idRequisito,
      },
      onResponse({ request, response, options }) {
        console.log("[onResponse]: ", response._data)
      },
      onResponseError({ request, response, options }) {
        console.log("[onResponseError]: ", response._data)
        // throw new Error(response._data[0].property)
      }
    })

    return response;
})
