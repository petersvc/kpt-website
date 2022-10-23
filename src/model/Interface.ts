// import { SetStateAction } from 'react'

// let a: a

// interface a: {
//   nome: string,
//   idade: number,
//   limbs: Array<string>
// }

export interface IProduct {
  readonly _id: string
  readonly name: string
  readonly price: string
  readonly priceint: number
  readonly model: string
  readonly serie: string
  readonly manufactor: string
  readonly store: string
  readonly link: string
  readonly image?: string
}

export interface IGpu extends IProduct {
  readonly brand: string
  propertyName: keyof IGpu
}

export interface IfetchResponse {
  rawData: IGpu[]
  isFetching: boolean
  // setData: React.Dispatch<SetStateAction<IGpu[]>>
}

export interface Ihome {
  err: unknown
  data: IGpu[]
  gpus: IGpu[]
  gpusRaw: IGpu[]
  gpu: IGpu
  // setGpus: React.Dispatch<SetStateAction<IGpu[]>>
}

export interface IsidebarProps {
  gpus: IGpu[]
  // gpusRaw: IGpu[]
  gpusFiltersData: Array<{ name: string; items: string[] }>
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
  gpusRaw: IGpu[]
  allFilters: (e: { target: HTMLInputElement }) => void
}

export interface IGpuDiv {
  gpu: IGpu
}

export interface IGpusTableProps {
  gpus: IGpu[]
  dataSize: string[]
}

export interface IStoresProps {
  gpus: IGpu[]
}

export interface Ifilters {
  price: boolean
  store: boolean
  brand: boolean
  serie: boolean
  model: boolean
  manufactor: boolean
}

export interface IFilterExpression {
  SetStateAction: Ifilters
}
