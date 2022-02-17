import axios, { AxiosResponse } from 'axios'

const STATION_URL = 'https://api.ekispert.jp/v1/json/station/light'
const REGIST_KEY = 'LE_XNbZudkUtnbEb'

interface Response {
  ResultSet: ResultSet
}
interface ResultSet {
  apiversion: string
  engineVersion: string
  Point?: Array<Point> | Point
}

interface Point {
  Prefecture: unknown
  Station: Station
}

export interface Station {
  code: string
  Name: string
  Type: string
  Yomi: string
}

export async function getStationByCode(code: string) {
  return await getStation({ key: REGIST_KEY, code: code })
}

export async function getStationByName(word: string) {
  return await getStation({ key: REGIST_KEY, name: word })
}

async function getStation(params: object): Promise<Array<Station> | undefined> {
  try {
    const res: AxiosResponse<Response> = await axios.get(STATION_URL, {
      params: params,
    })
    if (res.status !== 200) {
      console.log(`error status: ${res.status}`)
      return
    }

    let result: Array<any> = new Array()
    let resultset = res.data.ResultSet
    if (Object.keys(resultset).some((k) => k === 'Point')) {
      if (Array.isArray(resultset.Point)) {
        result.push(resultset.Point?.map((r) => r.Station))
      } else {
        result.push(resultset.Point?.Station)
      }
    }
    return result
    /*    
    result.push()
    return Object.keys(res.data.ResultSet).some((k) => k === 'Point')
      ? res.data.ResultSet.Point?.map((r) => r.Station)
      : undefined
*/
  } catch (error) {
    console.log(`some thing error: ${error}`)
  }
}
//https://api.ekispert.jp/v1/json/station/light?key=LE_XNbZudkUtnbEb&name=本八幡
