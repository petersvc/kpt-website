import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import React, { useState } from 'react'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import GpusTable from '../components/GpusTable'
import { IGpu } from '../model/Interface'
import { useFetch } from '../hooks/useFetch'
import loading from '../../public/img/loader.svg'

const Home: NextPage = () => {
  // const Home: NextPage<Ihome> = ({ data }: Ihome) => {
  const uri = String(process.env.NEXT_PUBLIC_API_URI)
  const [data, setData] = useState<IGpu[]>([])
  const { rawData, isFetching } = useFetch(uri, setData)
  // function doStuff(): void {
  //   console.log('data', data)
  // }

  let gpusRaw: IGpu[] = []
  let dataRaw: IGpu[] = []

  if (isFetching) {
    console.log('Fetching...')
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Image src={loading} alt="loading" width="150px" height="150px" />
      </div>
    )
  }

  if (data !== undefined) {
    gpusRaw = [...rawData]
    dataRaw = [...data]

    console.log('gpusRaw lenght: ', gpusRaw.length)
    console.log('gpus lenght: ', data.length)
    console.log('dataRaw lenght: ', dataRaw.length)
  }

  console.log('rendered')

  return (
    <>
      <Head>
        <title>KPT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={'main flex flex-col w-[100%] h-full font-fancy font-normal text-text bg-bgMain z-0'}>
        <Header />
        <div className="flex flex-row w-[100%]">
          {/* <button className="absolute z-50" onClick={() => doStuff()}>
            Clique aqui
          </button> */}

          <Sidebar gpusRaw={gpusRaw} gpus={data} setGpus={setData} />
          <GpusTable gpus={data} />
        </div>
      </div>
    </>
  )
}

export default Home
/*

<Sidebar GpusRaw={GpusRaw} Gpus={Gpus} setGpus={setGpus} />
<GpusTable Gpus={Gpus} />

// const { data, isFetching } = useQuery<IGpu[]>('gpus', async () => {
  //   const response = await axios.get(uri)
  //   return response.data
  // })

*/
