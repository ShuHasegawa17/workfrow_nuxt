import axios, { AxiosResponse } from 'axios'

const STATION_URL = 'https://api.ekispert.jp/v1/json/station/light'
const RESULT_URL = 'https://api.ekispert.jp/v1/json/search/course/light'
const REGIST_KEY = 'LE_XNbZudkUtnbEb'

interface Response {
  ResultSet: ResultSet
}
interface ResultSet {
  apiversion: string
  engineVersion: string
  Point?: Array<Point> | Point
  ResourceURI?: string
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
  return await getStation({ code: code })
}

export async function getStationByName(word: string) {
  return await getStation({ name: word })
}

export async function getURL(from: string, to: string) {
  const res = await get(RESULT_URL, { from: from, to: to })
  if (!res) {
    return
  }
  return res.data.ResultSet.ResourceURI
}

async function getStation(params: object) {
  const res = await get(STATION_URL, params)
  if (!res) {
    return
  }
  let result: Array<any> = new Array()
  let resultset = res.data.ResultSet
  if (Object.keys(resultset).some((k) => k === 'Point')) {
    if (Array.isArray(resultset.Point)) {
      result.push(...resultset.Point?.map((r) => r.Station))
    } else {
      result.push(resultset.Point?.Station)
    }
  }
  return result
}

async function get(URL: string, params: object) {
  try {
    const res: AxiosResponse<Response> = await axios.get(URL, {
      params: { key: REGIST_KEY, ...params },
    })
    if (res.status !== 200) {
      console.log(`error status: ${res.status}`)
      return
    }
    return res
  } catch (error) {
    console.log(`some thing error: ${error}`)
  }
}

//https://api.ekispert.jp/v1/json/station/light?key=LE_XNbZudkUtnbEb&name=本八幡
