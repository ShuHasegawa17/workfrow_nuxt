import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Address } from '~/types/zipAddress'
const ZIP_ADDRESS = `https://zipcloud.ibsnet.co.jp/api/search`

interface Respnse {
  message: string
  results: Array<Address>
  status: number
}

export async function getAddress(
  zipcode: string
): Promise<Address | undefined> {
  try {
    const res: AxiosResponse<Respnse> = await axios.get(ZIP_ADDRESS, {
      params: {
        zipcode: zipcode,
      },
    })
    if (res.status !== 200) {
      console.log(`error status: ${res.status}`)
      return
    }
    return res.data.results[0]
  } catch (error) {
    console.log(`some thing error: ${error}`)
  }
}

//https://api.ekispert.jp/v1/json/station/light?key=LE_XNbZudkUtnbEb&name=本八幡
