import { useRouter } from 'next/router'
import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { BiSortDown } from 'react-icons/bi'

import { IGpuDiv, IGpusTableProps } from '../model/Interface'
import spinner from '../../public/img/loader.svg'
import Stores from './Stores'
import { getPageParameter, getPageNumber } from '../services/_Gpus'

const GpusTable: FC<IGpusTableProps> = ({ gpus, dataSize }: IGpusTableProps) => {
  const [loading, setLoading] = useState(false)

  const { query, events } = useRouter()
  const pagePath = String(query.id)
  const size = Number(dataSize[0])
  const limit = 30
  const numberOfPages = Math.ceil(size / limit)
  const navPages: number[] = []
  for (let i = 1; i <= numberOfPages; i++) {
    navPages.push(i)
  }

  useEffect(() => {
    const start = (): void => {
      setLoading(true)
    }
    const end = (): void => {
      setLoading(false)
    }
    events.on('routeChangeStart', start)
    events.on('routeChangeComplete', end)
    events.on('routeChangeError', end)
    return () => {
      events.off('routeChangeStart', start)
      events.off('routeChangeComplete', end)
      events.off('routeChangeError', end)
    }
  }, [events])

  function goToNextPage(): string {
    const pageNumber = getPageNumber(pagePath)
    if (pageNumber + 1 > numberOfPages) {
      // Number(dataSize[0]) / limit)
      return pagePath
    }
    // console.log('page: ', pageNumber)

    const d = getPageParameter(pagePath)
    const newPath = pagePath.replace(d, `page=${pageNumber + 1}`)
    return newPath
  }

  function goToPreviousPage(): string {
    const pageNumber = getPageNumber(pagePath)
    if (pageNumber < 2) {
      return pagePath
    }
    // console.log('page: ', pageNumber)
    const d = getPageParameter(pagePath)
    const newPath = pagePath.replace(d, `page=${pageNumber - 1}`)
    return newPath
  }

  function goToSpecificPage(pageNumber: number): string {
    const d = getPageParameter(pagePath)
    const newPath = pagePath.replace(d, `page=${pageNumber}`)
    return newPath
  }

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Image src={spinner} alt="loading" width="150px" height="150px" />
      </div>
    )
  }

  const GpuDiv: FC<IGpuDiv> = ({ gpu }: IGpuDiv) => {
    const gpuDiv = [gpu.name, gpu.priceint, gpu.brand, gpu.model, gpu.serie, gpu.manufactor, gpu.store]

    return (
      <div className={'flex flex-row items-center w-full rounded-lg'}>
        {gpuDiv.map((value) => (
          <div key={`gpuDiv${value}`} className={`flex flex-col w-[${value === gpu.name ? '40%' : '10%'}]`}>
            <h1 className={`text-sm ${value === gpu.priceint ? 'text-[rgb(58,197,138)]' : 'text-text'}`}>
              {value === gpu.priceint ? 'R$ ' : ''}
              {value === gpu.priceint ? value : value}
            </h1>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col w-[83%] bg-softDark ml-10 mt-8">
        <Stores gpus={gpus} />

        <div className={'flex flex-row text-md bg-dark mb-0 py-3 pl-6 rounded-t-lg transition duration-500 linear group'}>
          {['Nome', 'Preço', 'Marca', 'Modelo', 'Serie', 'Fabricante', 'Loja'].map((value) => (
            <div key={value} className={`flex flex-row ${value !== 'Nome' ? 'w-[10%]' : 'w-[40%]'}`}>
              <h1 className={'opacity-[1]'}>{value}</h1>
              <button className={'flex justify-center items-center ml-3 text-[rgb(166, 173, 186)]'}>
                <BiSortDown
                  size={20}
                  // onClick={() => {
                  //   sortGpus(value)
                  // }}
                />
              </button>
            </div>
          ))}
        </div>

        {gpus?.map((gpu) => (
          <a
            key={gpu.link}
            className={'pl-6 mb-0 py-4 border-b border-dark transition duration-500 linear hover:bgs-[rgb(46,46,53)]'}
            target="_blank"
            href={'https://www.' + gpu.link}
            rel="noopener noreferrer"
          >
            <GpuDiv gpu={gpu} />
          </a>
        ))}

        <div className="flex flex-row justify-center my-7">
          <Link href={goToPreviousPage()}>
            <a className="py-2">Anterior</a>
          </Link>
          {navPages.map((value) => (
            <Link key={`linkToPage${value}`} href={goToSpecificPage(value)}>
              <a className="mx-1 px-2 py-2">{value}</a>
            </Link>
          ))}
          <Link href={goToNextPage()}>
            <a className="py-2">Próxima</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default GpusTable
// () => void push(`/gpus/${pagePath.replace(getPageParameter(), `page=${i + 1}`)}`)
