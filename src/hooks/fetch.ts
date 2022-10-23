import axios from 'axios'
import { IGpu } from '../model/Interface'

export async function fetch(uri: string): Promise<IGpu[]> {
  const res = await axios.get(uri)
  return res.data
}
