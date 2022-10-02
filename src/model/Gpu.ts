// import { IGpu } from './Interface'
import Product from './Product'

export default class Gpu extends Product {
  private readonly _brand: string

  constructor(
    name: string,
    price: string,
    priceInt: number,
    model: string,
    serie: string,
    manufactor: string,
    store: string,
    link: string,
    brand: string
  ) {
    super(name, price, priceInt, model, serie, manufactor, store, link)
    this._brand = brand
  }

  get brand(): string {
    return this._brand
  }
}
