import { SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'
import { IGpu } from '../model/Interface'

interface IfetchResponse {
  rawData: IGpu[]
  isFetching: boolean
}

export function useFetch(uri: string, setData: React.Dispatch<SetStateAction<IGpu[]>>): IfetchResponse {
  const [isFetching, setIsFetching] = useState(true)
  const [rawData, setRawData] = useState<IGpu[]>([])

  useEffect(() => {
    void axios
      .get(uri)
      .then((response) => {
        setData(response.data.slice(0, 50))
        setRawData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsFetching(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { rawData, isFetching }
}
