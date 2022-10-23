// import { useEffect } from "react";
import React, { FC } from 'react'

import { IStoresProps } from '../model/Interface'

// import { BiSortDown } from 'react-icons/bi'
import { RiSearchLine } from 'react-icons/ri'

const Stores: FC<IStoresProps> = ({ gpus }: IStoresProps) => {
  // const tempStores = gpus.map(gpu => gpu.store)
  // const stores = ['Kabum', 'Pichau', 'Terabyte']

  // function storeNumbers(value: string): number {
  //   const temp = gpus.filter((gpu) => gpu.store === value)
  //   return temp.length
  // }

  return (
    <div className={'flex flex-row justify-between items-center w-[100%] mb-4'}>
      <h1 className={'ml-0 text-3xl'}>GPUs</h1>

      <div className={'flex w-[35%] h-2/4 justify-center items-center border border-borders'}>
        <div className={'flex h-full w-full items-center rounded-sm py-1'}>
          <button className={'ml-3 text-text opacity-[0.6]'}>
            <RiSearchLine size={16} />
          </button>
          <h1 className={'ml-3 my-5 italic/ text-sm opacity-[1]'}>Pesquisar por produtos</h1>
        </div>
      </div>

      <div className={'flex flex-row justify-between items-center py-1 rounded-sm bg-bgContentt'}>
        <h1 className={'text-sm'}>Encontrados:</h1>
        <div className={'ml-2 flex flex-row justify-between items-center rounded-sm bg-bgContent py-1.5 px-1.5'}>
          <div className={'flex flex-row justify-between items-center py-1 px-1 rounded-sm bg-bgIndermediate2'}>
            <h1 className={'text-xs'}>{gpus.length}</h1>
          </div>
          <h1 className={'ml-3 text-xs'}>GPUs</h1>
        </div>
      </div>
    </div>
  )
}

export default Stores

/*
{stores.map((value) => (
        <div key={value} className={'flex flex-row justify-between items-center py-0 px-0 rounded-xl bg-bgContentt'}>
          <div className={'flex flex-row justify-between items-center rounded-sm bg-bgContentt border border-borders'}>
            <button className={'flex justify-center items-center h-8 w-10 border-2 border-bgContent'}>
              <h2 className={'text-smm'}>{storeNumbers(value)}</h2>
              <BiSortDown className={'hidden'} size={16} />
            </button>
          </div>
          <div className={'flex flex-row justify-between items-center'}>
            <h1 className={'ml-3 '}>{value}</h1>
          </div>
        </div>
      ))}
*/
