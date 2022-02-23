import axios, { AxiosResponse } from 'axios'

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://wf-rest.herokuapp.com'
    : 'http://localhost:8003'
export async function getUserList() {
  const res = await axios.get(`${URL}/users`).catch((err) => {
    console.log('エラー発生')
    return err.response
  })
  console.log(res.data)
  return res.data
}
