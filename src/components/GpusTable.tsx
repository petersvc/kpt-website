import React, { FC, useState } from 'react'

import { BiSortDown } from 'react-icons/bi'
import Gpu from '../model/Gpu'
import { IGpusTableProps, IGpuDiv } from '../model/Interface'
import Stores from './Stores'

const GpusTable: FC<IGpusTableProps> = ({ Gpus }: IGpusTableProps) => {
  const [sortGpu, setSortGpu] = useState({ type: 'Preço', isDown: true })

  const sortGpus = (typeProp: string): void => {
    const start: number = performance.now()
    // console.log(typeProp)
    setSortGpu({ type: typeProp, isDown: !sortGpu.isDown })
    // console.log(sortGpu)
    Gpus.sort(sortByType)
    const end: number = performance.now()
    // console.log(sortGpu)

    console.log(Number(end - start))
  }

  const sortByType = (a: Gpu, b: Gpu): number => {
    // console.log('sorting By Type')
    let value1 = ''
    let value2 = ''
    let value1int = 0
    let value2int = 0

    switch (sortGpu.type) {
      case 'Nome':
        value1 = a.model
        value2 = b.model
        break
      case 'Modelo':
        value1 = a.model
        value2 = b.model
        break
      case 'Serie':
        value1 = a.serie
        value2 = b.serie
        break
      case 'Marca':
        value1 = a.brand
        value2 = b.brand
        break
      case 'Fabricante':
        value1 = a.manufactor
        value2 = b.manufactor
        break
      case 'Loja':
        value1 = a.store
        value2 = b.store
        break
      default:
        value1int = a.priceInt
        value2int = b.priceInt
    }

    // ORDER
    if (sortGpu.type === 'Preço') {
      // console.log('Preço')
      if (sortGpu.isDown) {
        // console.log('isDown')
        return value1int - value2int
      } else {
        // console.log('isUp')
        return value2int - value1int
      }
    } else {
      if (sortGpu.isDown) {
        return value1 > value2 ? 1 : value2 > value1 ? -1 : 0
      } else {
        return value1 < value2 ? 1 : value2 < value1 ? -1 : 0
      }
    }
  }

  const GpuDiv: FC<IGpuDiv> = ({ Gpu }: IGpuDiv) => {
    const gpuDiv = [Gpu.name, Gpu.priceInt, Gpu.brand, Gpu.model, Gpu.serie, Gpu.manufactor.toUpperCase(), Gpu.store]

    return (
      <div className={'flex flex-row items-center w-full rounded-lg'}>
        {gpuDiv.map((value) => (
          <div key={value} className={`flex flex-col w-[${value === Gpu.name ? '40%' : '10%'}]`}>
            <h1 className={`text-sm ${value === Gpu.priceInt ? 'text-[rgb(58,197,138)]' : 'text-[rgb(200,200,200)]'}`}>
              {value === Gpu.priceInt ? 'R$ ' : ''}
              {value === Gpu.priceInt ? value : value}
            </h1>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-[79%] ml-10 mt-8">
      <Stores Gpus={Gpus} />

      <div
        className={
          'flex flex-row text-md bg-bgIndermediate2 shadow-md shadow-[rgb(28,28,28)] mb-1 py-5 pl-6 border-b border-borders transition duration-500 linear group'
        }
      >
        {['Nome', 'Preço', 'Marca', 'Modelo', 'Serie', 'Fabricante', 'Loja'].map((value) => (
          <div key={value} className={`flex flex-row ${value !== 'Nome' ? 'w-[10%]' : 'w-[40%]'}`}>
            <h1 className={'opacity-[1]'}>{value}</h1>
            <button className={'flex justify-center items-center ml-3 text-[rgb(100,100,100)]'}>
              <BiSortDown size={20} onClick={() => sortGpus(value)} />
            </button>
          </div>
        ))}
      </div>

      {Gpus.map((Gpu) => (
        <a
          key={Gpu.link}
          className={'pl-6 mb-1 rounded-sm py-5 bg-bgIndermediate transition duration-500 linear hover:bgs-[rgb(46,46,53)]'}
          target="_blank"
          href={'https://www.' + Gpu.link}
          rel="noopener noreferrer"
        >
          <GpuDiv Gpu={Gpu} />
        </a>
      ))}
    </div>
  )
}

export default GpusTable
