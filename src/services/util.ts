import axios from 'axios'
// import { env } from '../env'

import Gpu from '../model/Gpu'

export async function createDb(apiUri: string): Promise<Gpu[]> {
  // const uri = apiUri // 'http://localhost:3000/api/gpus' // 'https://localhost:7298/api/Gpus'
  // const headers = { 'Content-Type': 'application/json; charset=utf-8' }
  const response = await axios.get(apiUri) // (uri, { headers })
  const { gpusData } = await response.data
  return gpusData
}

export function createObjects(JsonData: Gpu[]): Gpu[] {
  const data: Gpu[] = []

  JsonData.forEach((item) => {
    data.push(new Gpu(item.name, item.price, item.priceInt, item.model, item.serie, item.manufactor, item.store, item.link, item.brand))
  })
  return data
}

/* export default class Db {
  public static async createDb() {
    const response = await axios.get('http://localhost:3000/api/gpus')
    const { gpusData } = await response.data
    if (gpusData) {
      return gpusData
    }
  }

  public static createObjects(JsonData: Gpu[]): Gpu[] {
    const data: Gpu[] = []

    JsonData.forEach((item) => {
      data.push(new Gpu(item.name, item.price, item.priceInt, item.model, item.serie, item.manufactor, item.store, item.link, item.brand))
    })
    return data
  }
} */
