import React, { FC } from 'react'

import { BiSortDown } from 'react-icons/bi'
import { IGpusTableProps, IGpuDiv } from '../model/Interface'
import Stores from './Stores'

const GpusTable: FC<IGpusTableProps> = ({ Gpus }: IGpusTableProps) => {
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

      <div className={'flex flex-row text-md bg-[rgb(40,100,20)]/ py-5 pl-6 border-b border-borders transition duration-500 linear group'}>
        {['Nome', 'Preço', 'Marca', 'Modelo', 'Serie', 'Fabricante', 'Loja'].map((value) => (
          <div key={value} className={`flex flex-row ${value !== 'Nome' ? 'w-[10%]' : 'w-[40%]'}`}>
            <h1 className={'opacity-[1]'}>{value}</h1>
            <button className={'flex justify-center items-center ml-3 text-[rgb(100,100,100)]'}>
              <BiSortDown size={20} />
            </button>
          </div>
        ))}
      </div>

      {Gpus.map((Gpu) => (
        <a
          key={Gpu.link}
          className={'pl-6 mb-2 rounded-sm py-5 bg-bgIndermediate transition duration-500 linear hover:bgs-[rgb(46,46,53)]'}
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
