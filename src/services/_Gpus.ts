import { IGpu, IProperties } from '../model/Interface'

export function findMaxAndMinPrice(Gpus: IGpu[]): { max: number; min: number } {
  const max = findMaxPrice(Gpus)
  const min = findMinPrice(Gpus)
  return { max, min }
}

export function findMinPrice(Gpus: IGpu[]): number {
  return Gpus.reduce((acc, val) => (val.priceInt < acc ? val.priceInt : acc), Number.MAX_VALUE)
}

export function findMaxPrice(Gpus: IGpu[]): number {
  return Gpus.reduce((acc, val) => (val.priceInt > acc ? val.priceInt : acc), Number.MIN_VALUE)
}

export function numbers(value: string, GpusRaw: IGpu[], brands: string[], models: string[], series: string[], stores: string[]): number {
  let temp: IGpu[] = []

  if (series.includes(value)) {
    temp = GpusRaw.filter((Gpu) => Gpu.serie === value)
  } else if (models.includes(value)) {
    temp = GpusRaw.filter((Gpu) => Gpu.model === value)
  } else if (stores.includes(value)) {
    temp = GpusRaw.filter((Gpu) => Gpu.store === value)
  } else {
    temp = GpusRaw.filter((Gpu) => Gpu.brand === value)
  }

  return temp.length
}

export function getProperties(GpusRaw: IGpu[]): IProperties {
  const tempStores = GpusRaw.map((Gpu) => Gpu.store)
  const stores = GpusRaw.map((Gpu) => Gpu.store).filter((store, i) => tempStores.indexOf(store) === i)

  const tempBrands = GpusRaw.map((Gpu) => Gpu.brand)
  const brands = GpusRaw.map((Gpu) => Gpu.brand).filter((brand, i) => tempBrands.indexOf(brand) === i)

  const tempSeries = GpusRaw.map((Gpu) => Gpu.serie)
  const series = GpusRaw.map((Gpu) => Gpu.serie).filter((serie, i) => tempSeries.indexOf(serie) === i)

  const tempModels = GpusRaw.map((Gpu) => Gpu.model)
  const models = GpusRaw.map((Gpu) => Gpu.model).filter((model, i) => tempModels.indexOf(model) === i)

  const properties = {
    stores: { names: stores, numbers: stores.length },
    brands: { names: brands, numbers: brands.length },
    series: { names: series, numbers: series.length },
    models: { names: models, numbers: models.length }
  }
  return properties
}
