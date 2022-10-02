import type { NextApiRequest, NextApiResponse } from 'next'
import gpusData from './gpusData.json'

interface gpu {
  model: string
  serie: string
  manufactor: string
  brand: string
  name: string
  link: string
  price: string
  priceInt: number
  image: string
  store: string
}

type Data = {
  gpusData: Array<gpu>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ gpusData: gpusData })
}
