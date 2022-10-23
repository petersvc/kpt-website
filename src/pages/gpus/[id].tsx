import React, { FC } from 'react'
import Head from 'next/head'
// import Image from 'next/image'
import { GetServerSideProps } from 'next'
import axios from 'axios'
// import loading from '../../../public/img/loader.svg'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import GpusTable from '../../components/GpusTable'
// import loading from '../../../public/img/loader.svg'

import { IGpu } from '../../model/Interface'

interface Props {
  gpusData: IGpu[]
  isLoading: boolean
  errorMsg: string
  gpusFiltersData: Array<{ name: string; items: string[] }>
}

const Gpus: FC<Props> = ({ gpusData: gpus, gpusFiltersData }: Props) => {
  // console.log(isLoading, errorMsg)
  // if (isLoading) {
  //   return (
  //     <div className="flex w-full h-screen justify-center items-center">
  //       <Image src={loading} alt="loading" width="250px" height="250px" />
  //     </div>
  //   )
  // }
  console.log('rendered')
  const dataSize = gpusFiltersData[3].items
  // console.log(gpus)
  // console.log(gpusFiltersData)
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
          <Sidebar gpus={gpus} gpusFiltersData={gpusFiltersData} />
          <GpusTable gpus={gpus} dataSize={dataSize} />
        </div>
      </div>
    </>
  )
}
export default Gpus

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = String(params?.id)

  const baseUri = String(process.env.API_BASE_URI)
  const gpusEndpoint = '/gpus'
  const gpusUri = baseUri + gpusEndpoint + '?' + id
  const gpusResponse = await axios.get(gpusUri)
  const gpusData = gpusResponse.data

  const gpusFiltersEndpoint = '/gpuFilter'
  const gpusFiltersUri = baseUri + gpusFiltersEndpoint
  const gpusFiltersResponse = await axios.get(gpusFiltersUri)
  const gpusFiltersData = gpusFiltersResponse.data

  return {
    props: {
      gpusData,
      gpusFiltersData
    }
  }
}

/* 

try {
    response = await axios.get(uri)
    data = response.data
  } catch (error) {
    if (error.response) {
      err = { message: error.response.data, code: error.response.status, status: error.response.status }
    }
  } finally {
    loading = false
  }


 // const response = await axios.get(uri)
  // const data = response.data

  // const data = await fetch(uri).then(async (res) => await res.json())
<div className="flex w-full h-screen justify-center items-center">
  <button className="z-50 text-pink-400 text-9xl" onClick={() => setCounter((current) => current + 1)}>
    +
  </button>
  <p className="z-50 text-blue-700 text-9xl mx-10">{counter}</p>
  <button className="z-50 text-red-600 text-9xl" onClick={() => setCounter((current) => current - 1)}>
    -
  </button>
</div> 

<div className="flex w-full h-screen justify-center items-center">
  <button className="z-50 text-pink-400 text-9xl" onClick={() => doStuff()}>
    getData
  </button>
</div>
*/
