// import { ObjectId } from 'bson'

export default abstract class Product {
  // private readonly _id: string
  private readonly _name: string
  private readonly _price: string
  private readonly _priceInt: number
  private readonly _model: string
  private readonly _serie: string
  private readonly _manufactor: string
  private readonly _store: string
  private readonly _link: string

  constructor(name: string, price: string, priceInt: number, model: string, serie: string, manufactor: string, store: string, link: string) {
    // this._id = id
    this._name = name
    this._price = price
    this._priceInt = priceInt
    this._model = model
    this._serie = serie
    this._manufactor = manufactor
    this._store = store
    this._link = link
  }

  public get name(): string {
    return this._name
  }

  public get price(): string {
    return this._price
  }

  public get priceInt(): number {
    return this._priceInt
  }

  public get model(): string {
    return this._model
  }

  public get serie(): string {
    return this._serie
  }

  public get manufactor(): string {
    return this._manufactor
  }

  public get store(): string {
    return this._store
  }

  public get link(): string {
    return this._link
  }
}

/*

{
   name: string
   price: string
   priceInt: number
   model: string
   serie: string
   brand: string
   manufactor: string
   store: string
   link: string
 }

 {
   name: "rtx 3060"
   price: "3200"
   priceInt: 3200
   model: "3060"
   serie: "30"
   brand: "Asus"
   manufactor: "Nvidia"
   store: "Kabum"
   link: "https://www.kabum.com.br/produto/164947/placa-de-video-asus-geforce-rtx-3060-oc-edition-12gb-gddr6-192-bits-dual-rtx3060-o12g"
 }

*/
