// import { useEffect } from "react";
import React, { FC } from 'react'

import { IStoresProps } from '../model/Interface'

import { BiSortDown } from 'react-icons/bi'
import { RiSearchLine } from 'react-icons/ri'

const Stores: FC<IStoresProps> = ({ Gpus }: IStoresProps) => {
  // const tempStores = gpus.map(gpu => gpu.store)
  const stores = ['Kabum', 'Pichau', 'Terabyte']

  function storeNumbers(value: string): number {
    const temp = Gpus.filter((Gpu) => Gpu.store === value)
    return temp.length
  }

  return (
    <div className={'flex flex-row justify-between items-center w-[96.3%] h-[30%] mb-4'}>
      {stores.map((value) => (
        <div key={value} className={'flex flex-row justify-between items-center py-0 px-0 rounded-xl bg-bgContentt'}>
          <div className={'flex flex-row justify-between items-center rounded-sm bg-bgContentt border border-borders'}>
            <button className={'flex justify-center items-center p-1 text-[rgb(100,100,100)] border-2 border-bgContent'}>
              <h2 className={'text-smm'}>{storeNumbers(value)}</h2>
              <BiSortDown className={'hidden'} size={16} />
            </button>
          </div>
          <div className={'flex flex-row justify-between items-center'}>
            <h1 className={'ml-3 '}>{value}</h1>
          </div>
        </div>
      ))}

      <div className={'flex w-[35%] h-2/4 justify-center items-center border border-borders'}>
        <div className={'flex h-full w-full items-center rounded-sm py-1'}>
          <button className={'ml-3 text-icon'}>
            <RiSearchLine size={16} />
          </button>
          <h1 className={'ml-3 my-5 italic font-normal text-sm opacity-[0.5]'}>Pesquisar por produtos</h1>
        </div>
      </div>

      <div className={'flex flex-row justify-between items-center py-3 px-5 rounded-full bg-bgContentt border border-borders'}>
        <h1 className={'text-sm'}>Encontrados: {Gpus.length}</h1>
      </div>
    </div>
  )
}

export default Stores

// find a
