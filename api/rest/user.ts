import axios, { AxiosResponse } from 'axios'

//const BASE_URL = 'https://wf-rest.herokuapp.com'
const BASE_URL = 'http://localhost:8080'

export async function getUserList() {
  const res = await axios.get(`${BASE_URL}/users`)
  console.log(res)
  return res.data
}
