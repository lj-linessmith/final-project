import request from 'superagent'

const rootUrl = '/api/v1/details'

export async function getLocationsDetailsApi(apiWinner: string) {
  const response = await request.get(`${rootUrl}/${apiWinner}`)
  return response.body
}
