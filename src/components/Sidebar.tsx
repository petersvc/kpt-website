import Slider from '@mui/material/Slider'
import React, { useEffect, useState } from 'react'
import { IsidebarProps } from '../model/Interface'
import { findMaxAndMinPrice, numbers, getProperties } from '../services/_Gpus'

const Sidebar: React.FC<IsidebarProps> = ({ GpusRaw, Gpus, setGpus }: IsidebarProps) => {
    const [lastFilteredGpus, setLastFilteredGpus] = useState<IsidebarProps['Gpus']>([])

    const [price, setPrice] = useState([0, 30000])
    const [minPrice, setMinPrice] = useState<number>()
    const [maxPrice, setMaxPrice] = useState<number>()
    const [loading, setLoading] = useState(true)
    // const priceText = (price:number) => `${price}`
    const [storesFilter, setStoresFilter] = useState<string[]>([])

    const [brandsFilter, setBrandsFilter] = useState<string[]>([])

    const [seriesFilter, setSeriesFilter] = useState<string[]>([])

    const [modelsFilter, setModelsFilter] = useState<string[]>([])

    const { brands, models, series, stores } = getProperties(GpusRaw)
    
    const [filters, setFilters] = useState({
        price: false,
        store: false,
        brand: false,
        serie: false,
        model: false,
        manufactor: false
    })

    const sumAllfilters = [...brandsFilter, ...seriesFilter, ...modelsFilter].length


    function handlePrice(_event: Event, newValue: number | number[]): void {
        setPrice(newValue as number[])
    }

    function sliderPrices(): void {
        let GpuSource: IsidebarProps['Gpus']

        sumAllfilters > 0 ? (GpuSource = lastFilteredGpus) : (GpuSource = GpusRaw)
        // eslint-disable-next-line prettier/prettier
        const { min, max } = findMaxAndMinPrice(GpuSource)
        setMinPrice(min)
        setMaxPrice(max)
    }

    function filterPrice(): void {
        let tempGpus: IsidebarProps['Gpus'] = []
        if (sumAllfilters > 0) {
            tempGpus = lastFilteredGpus.filter(
                (Gpu) => Gpu.priceInt >= price[0] && Gpu.priceInt <= price[1]
            )
            // console.log('filterPrice if inside: ', brandsFilter.length)
        } else {
            tempGpus = GpusRaw.filter(
                (Gpu) => Gpu.priceInt >= price[0] && Gpu.priceInt <= price[1]
            )
            // console.log('filterPrice else inside: ', brandsFilter.length)
        }
        setGpus(
            tempGpus.filter(
                (Gpu) => Gpu.priceInt >= price[0] && Gpu.priceInt <= price[1]
            )
        )
        // console.log('inside filterprice: ', filters['price'])
    }

    function allFilters(e: { target: HTMLInputElement }): void {
        const GpusByBrand: IsidebarProps['Gpus'] = []
        const GpusBySerie: IsidebarProps['Gpus'] = []
        const GpusByModel: IsidebarProps['Gpus'] = []
        const GpusByStore: IsidebarProps['Gpus'] = []
        let allGpus: IsidebarProps['Gpus'] = []

        if (e.target.id === 'brand' || filters.brand) {
            // console.log('allfilters brands')
            filterBrands(e, GpusByBrand)
        }

        if (e.target.id === 'serie' || filters.serie) {
            // console.log('allfilters series')
            filterSeries(e, GpusBySerie)
        }

        if (e.target.id === 'model' || filters.model) {
            // console.log('allfilters models')
            filterModels(e, GpusByModel)
        }

        if (e.target.id === 'store' || filters.store) {
            // console.log('allfilters stores')
            filterStores(e, GpusByStore)
        }

        if (e.target.querySelector('[name="sliderPrice"]') != null) {
            console.log('tipo do slider:', typeof e.target.querySelector)
            // console.log('allfilters prices')
            return filterPrice()
        }

        // console.log('byBrands:', GpusByBrand)

        allGpus = [...GpusByBrand, ...GpusByModel, ...GpusBySerie, ...GpusByStore]

        // console.log('allGpus', allGpus)

        const validGpus: IsidebarProps['Gpus'] = []
        const validGpus2: IsidebarProps['Gpus'] = []

        for (const Gpu of allGpus) {
            if (!validGpus.includes(Gpu)) {
                validGpus.push(Gpu)
            }
        }

        for (const Gpu of validGpus) {
            if (brandsFilter.includes(Gpu.brand) || brandsFilter.length === 0)
                if (modelsFilter.includes(Gpu.model) || modelsFilter.length === 0)
                    if (seriesFilter.includes(Gpu.serie) || seriesFilter.length === 0)
                        if (
                            storesFilter.includes(Gpu.store) ||
                            storesFilter.length === 0
                        )
                            validGpus2.push(Gpu)
        }

        setGpus(validGpus2)
        setLastFilteredGpus(validGpus2)
    }

    function filterBrands(e: { target: HTMLInputElement }, tempGpus: IsidebarProps['Gpus']): void {
        // console.log('Tipo do (e):', typeof e.target.querySelector)
        const tempBrand = e.target.name
        // let tempGpus: Gpu[] = []

        if (e.target.checked) {
            if (!filters.brand) {
                setFilters({ ...filters, brand: true })
            }
            brandsFilter.push(tempBrand)
            setBrandsFilter(brandsFilter)

            GpusRaw.forEach((Gpu) => {
                brandsFilter.forEach((brand) => {
                    if (brand === Gpu.brand) {
                        tempGpus.push(Gpu)
                    }
                })
            })
            // setGpus(tempGpus)
            // console.log('filterbrand checked')
        } else if (e.target.querySelector('[name="price"]') != null) {
            GpusRaw.forEach((Gpu) => {
                brandsFilter.forEach((brand) => {
                    if (brand === Gpu.brand) {
                        tempGpus.push(Gpu)
                    }
                })
            })
            // setGpus(tempGpus)
            // console.log('filterbrand mixed filter')
        } else {
            brandsFilter.splice(brandsFilter.indexOf(tempBrand), 1)
            setBrandsFilter(brandsFilter)

            if (brandsFilter.length > 0) {
                tempGpus.push(...Gpus.filter((Gpu) => Gpu.brand !== tempBrand))
                // setGpus(tempGpus)
                // console.log('filterbrand uncheck')
                // console.log(tempGpus)
            } else {
                setFilters({ ...filters, brand: false })
                tempGpus.push(...GpusRaw)
                // setGpus(tempGpus)
                // console.log('filterbrand uncheck no brand')
            }
        }
        // setGpus(tempGpus)
        setLastFilteredGpus(tempGpus)
        // console.log(lastFilteredGpus)
    }

    function filterSeries(e: { target: HTMLInputElement }, tempGpus: IsidebarProps['Gpus']): void {
        const tempSerie = e.target.name
        // let tempGpus: Gpu[] = []

        if (e.target.checked) {
            if (!filters.serie) {
                setFilters({ ...filters, serie: true })
            }
            seriesFilter.push(tempSerie)
            setSeriesFilter(seriesFilter)

            GpusRaw.forEach((Gpu) => {
                seriesFilter.forEach((serie) => {
                    if (serie === Gpu.serie) {
                        tempGpus.push(Gpu)
                    }
                })
            })
            // setGpus(tempGpus)
            // console.log('filterserie checked')
        } else if (e.target.querySelector('[name="price"]') != null) {
            GpusRaw.forEach((Gpu) => {
                seriesFilter.forEach((serie) => {
                    if (serie === Gpu.serie) {
                        tempGpus.push(Gpu)
                    }
                })
            })
            // setGpus(tempGpus)
            // console.log('filterserie mixed filter')
        } else {
            seriesFilter.splice(seriesFilter.indexOf(tempSerie), 1)
            setSeriesFilter(seriesFilter)

            if (seriesFilter.length > 0) {
                tempGpus.push(...Gpus.filter((Gpu) => Gpu.serie !== tempSerie))
                // setGpus(tempGpus)
                // console.log('filterserie uncheck')
            } else {
                setFilters({ ...filters, serie: false })
                tempGpus.push(...GpusRaw)
                // setGpus(tempGpus)
                // console.log('filterserie uncheck no serie')
            }
        }
        // setGpus(tempGpus)
        setLastFilteredGpus(tempGpus)
        // console.log(lastFilteredGpus)
    }

    function filterModels(e: { target: HTMLInputElement }, tempGpus: IsidebarProps['Gpus']): void {
        const tempModel = e.target.name
        // let tempGpus: Gpu[] = []

        if (e.target.checked) {
            if (!filters.model) {
                setFilters({ ...filters, model: true })
            }
            modelsFilter.push(tempModel)
            setModelsFilter(modelsFilter)

            GpusRaw.forEach((Gpu) => {
                modelsFilter.forEach((model) => {
                    if (model === Gpu.model) {
                        tempGpus.push(Gpu)
                    }
                })
            })
            // setGpus(tempGpus)
            // console.log('filtermodel checked')
        } else if (e.target.querySelector('[name="price"]') != null) {
            GpusRaw.forEach((Gpu) => {
                modelsFilter.forEach((model) => {
                    if (model === Gpu.model) {
                        tempGpus.push(Gpu)
                    }
                })
            })
            // setGpus(tempGpus)
            // console.log('filtermodel mixed filter')
        } else {
            modelsFilter.splice(modelsFilter.indexOf(tempModel), 1)
            setModelsFilter(modelsFilter)

            if (modelsFilter.length > 0) {
                tempGpus.push(...Gpus.filter((Gpu) => Gpu.model !== tempModel))
                // setGpus(tempGpus)
                // console.log('filtermodel uncheck')
            } else {
                setFilters({ ...filters, model: false })
                tempGpus.push(...GpusRaw)
                // setGpus(tempGpus)
                // console.log('filtermodel uncheck no model')
            }
        }
        // setGpus(tempGpus)
        setLastFilteredGpus(tempGpus)
        // console.log(lastFilteredGpus)
    }

    function filterStores(e: { target: HTMLInputElement }, tempGpus: IsidebarProps['Gpus']): void {
        const tempStore = e.target.name
        // let tempGpus: Gpu[] = []

        if (e.target.checked) {
            if (!filters.store) {
                setFilters({ ...filters, store: true })
            }
            storesFilter.push(tempStore)
            setStoresFilter(storesFilter)

            GpusRaw.forEach((Gpu) => {
                storesFilter.forEach((store) => {
                    if (store === Gpu.store) {
                        tempGpus.push(Gpu) /// //////////////////// ---------------------- ////////
                    }
                })
            })
            // setGpus(tempGpus)
            // console.log('filterstore checked')
        } else if (e.target.querySelector('[name="price"]') != null) {
            GpusRaw.forEach((Gpu) => {
                storesFilter.forEach((store) => {
                    if (store === Gpu.store) {
                        tempGpus.push(Gpu)
                    }
                })
            })
            // setGpus(tempGpus)
            // console.log('filterstore mixed filter')
        } else {
            storesFilter.splice(storesFilter.indexOf(tempStore), 1)
            setStoresFilter(storesFilter)

            if (storesFilter.length > 0) {
                tempGpus.push(...Gpus.filter((Gpu) => Gpu.store !== tempStore))
                // setGpus(tempGpus)
                // console.log('filterstore uncheck')
            } else {
                setFilters({ ...filters, store: false })
                tempGpus.push(...GpusRaw)
                // setGpus(tempGpus)
                // console.log('filterstore uncheck no store')
            }
        }
        // setGpus(tempGpus)
        setLastFilteredGpus(tempGpus)
        // console.log(lastFilteredGpus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        sliderPrices()
        setLoading(false)
    })

    const Components = [
    { name: 'Series', array: series.names },
    { name: 'Modelos', array: models.names },
    { name: 'Marcas', array: brands.names }
    ]
    
    return (
        <>
            {!loading ? (
                <aside className={'Sidebar w-[17%] px-2 mt-0 bg-bgIndermediate border-rr border-borders z-0'}>

                    <button className={'hidden'} onClick={() => sliderPrices()}>botao</button>

                    <form className={'flex flex-col w-[100%] rounded-xl pt-5 z-0'}>

                        <div className={'preco flex flex-col w-full pb-5 border-b border-borders'}>
                            <h1 className={'ml-5 text-md mt-3'}>Preço</h1>
                            <div className={'w-[80%] ml-7 mt-8'}>
                                <Slider
                                    value={price}
                                    onChange={handlePrice}
                                    onMouseUp={filterPrice}
                                    step={50}
                                    min={minPrice}
                                    max={maxPrice}
                                    name="sliderPrice"
                                    valueLabelDisplay="auto"
                                    size="small"
                                    disableSwap
                                />
                            </div>
                        </div>

                        <div className={'series flex flex-col w-[100%] mt-5 pb-5 border-b border-borders overflow-y'}>
           
                            {Components.map((component) => (
                                <div key={component.name} className={'series flex flex-col w-[100%] mt-5 pb-5 border-b border-borders overflow-y'}>
                                    <h1 className={'text-md ml-5'}>{component.name}</h1>
                                    <div className={'flex flex-col w-full ml-5 mt-3'}>
                                    {component.array.map((element) => (
                                        <div key={element}>
                                        <label key={element} htmlFor={element} className={'font-normal flex items-center mb-2 w-[85%]'}>
                                            <input
                                            type="checkbox"
                                            name={element}
                                            id={element}
                                            onChange={allFilters}
                                            className={
                                                'flex h-5 w-5 font-normal mr-3 appearance-none checked:bg-[rgb(132,168,236)] rounded-sm border border-[rgba(255,255,255,0.2)]'
                                            }
                                            />
                                            <h1 className={'text-xs opacity-[1] leading-6'}>{element.toUpperCase()}</h1>
                                            <h5
                                            id="elementNumbers"
                                            className={'ml-auto text-xss opacity-[0.6] text-[rgba(255,255,255,1)] rounded-sm text-center py-1 px-2 border-2 bg-bgIndermediate2 border-bgContent w-6/ h-6/ leading-6/'}
                                            >
                                            {numbers(element, GpusRaw, brands.names, models.names, series.names, stores.names)}
                                            </h5>
                                        </label>
                                        </div>
                                    ))}
                                    </div>
                                </div>                
                            ))}

                        </div>

                    </form>

                </aside>
            ) : null}
        </>
    )
}

export default Sidebar

/*
 */
