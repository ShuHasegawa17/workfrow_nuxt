import axios, { AxiosResponse } from 'axios'
import User from '~/domain/User'

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://wf-rest.herokuapp.com'
    : 'http://localhost:8003'

export async function getUserList() {
  console.log('default url->' + axios.defaults.url)
  const res = await axios.get(`${URL}/users`).catch((err) => {
    console.log(`エラー発生 => ${err}`)
    return err.response
  })
  console.log(res.data)
  return res.data
}

export async function getUser(userId: string) {
  const res = await axios.get(`${URL}/users/${userId}`).catch((err) => {
    console.log(`エラー発生 => ${err}`)
    return err.response
  })
  console.log(res.data)
  return jsonToUser(res.data)
}

function jsonToUser(data: any): User {
  let d: string = data.bornDate
  if (d.length > 10) {
    d = d.slice(0, 10)
  }
  return new User(
    data.id,
    data.userId,
    data.name,
    d,
    data.postNumber,
    data.address1,
    data.address2,
    data.address3,
    data.address4,
    data.email,
    data.activeFlag,
    data.memo
  )
}
