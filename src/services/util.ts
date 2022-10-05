import axios from 'axios'
import Gpu from '../model/Gpu'

export async function createDb(apiUri: string): Promise<Gpu[]> {
  const response = await axios.get(apiUri)
  const gpusData = await response.data
  return gpusData
}

export function createObjects(JsonData: Gpu[]): Gpu[] {
  const data: Gpu[] = []

  JsonData.forEach((item) => {
    data.push(new Gpu(item.name, item.price, item.priceInt, item.model, item.serie, item.manufactor, item.store, item.link, item.brand))
  })

  return data
}
