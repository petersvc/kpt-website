import { SetStateAction } from 'react'
import Gpu from './Gpu'

export interface IProduct {
  readonly name: string
  readonly price: string
  readonly priceInt: number
  readonly model: string
  readonly serie: string
  readonly manufactor: string
  readonly store: string
  readonly link: string
  readonly image?: string
}

export interface IGpu extends IProduct {
  readonly brand: string
}

export interface Iprops {
  data: Gpu[]
  Gpus: Gpu[]
  GpusRaw: Gpu[]
  Gpu: Gpu
  setGpus: React.Dispatch<SetStateAction<Gpu[]>>
}

export interface IsidebarProps {
  Gpus: Gpu[]
  GpusRaw: Gpu[]
  setGpus: React.Dispatch<SetStateAction<Gpu[]>>
  // sortGpu: { type: string; isDown: boolean }
}

export interface IProperties {
  stores: { names: string[]; numbers: number }
  brands: { names: string[]; numbers: number }
  series: { names: string[]; numbers: number }
  models: { names: string[]; numbers: number }
}

export interface ISidebarComponentsProps {
  series: string[]
  models: string[]
  brands: string[]
  stores: string[]
  GpusRaw: Gpu[]
  allFilters: (e: { target: HTMLInputElement }) => void
  // numbers: (ar0: string) => number
}

export interface IGpuDiv {
  Gpu: Gpu
}

export interface IGpusTableProps {
  Gpus: Gpu[]
}

export interface IStoresProps {
  Gpus: Gpu[]
}
