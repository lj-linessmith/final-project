import request from 'superagent'

const rootUrl = '/api/v1/current'

export async function getCurrentLocationApi(apiQuery: string) {
  const response = await request.get(`${rootUrl}/${apiQuery}`)
  return response.body
}
