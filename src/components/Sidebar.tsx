import React, { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'

import Slider from '@mui/material/Slider'
import { GoChevronRight } from 'react-icons/go'

import { IsidebarProps } from '../model/Interface'
import { translateId, getParameterSlice, getElementSlice } from '../services/_Gpus'

const Sidebar: React.FC<IsidebarProps> = ({ gpus, gpusFiltersData }: IsidebarProps) => {
  const [price, setPrice] = useState([0, 30000])
  const minPrice = 0
  const maxPrice = 30000
  const { push, query } = useRouter()
  const pagePath = String(query.id)

  function handlePrice(_event: Event, newValue: number | number[]): void {
    setPrice(newValue as number[])
  }

  const SidebarComponents = [{ name: 'Marcas', elements: gpusFiltersData[1].items }]

  const SeriesComponents: Array<{ name: string; models: string[] }> = []
  let filterdModels: string[] = []

  gpusFiltersData[2].items.forEach((name) => {
    if (name === '6000') {
      filterdModels = gpusFiltersData[0].items.filter((model) => model > name)
    } else {
      filterdModels = gpusFiltersData[0].items.filter((model) => model.slice(0, 2) === name)
    }

    SeriesComponents.push({ name, models: filterdModels })
  })

  // function getAllCheckboxes(): HTMLInputElement[] {
  //   const checkboxes = Array.from(document.getElementsByClassName('checkInput')) as HTMLInputElement[]
  //   return checkboxes.filter((checkbox) => checkbox.checked)
  // }

  function onCheckboxChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, checked, id } = e.target as HTMLInputElement
    const validId = translateId(id)
    const parameterSlice = getParameterSlice(pagePath, validId)

    if (checked) {
      if (parameterSlice === '') {
        // console.log('parameterSlice:', parameterSlice)
        void push(`${pagePath}&${validId}=${name}`)
      } else {
        // console.log('parameterSlice:', parameterSlice)
        void push(pagePath.replace(parameterSlice, `${parameterSlice},${name}`))
        // void push(pagePath.replace(parameterSlice, parameterSlice + ',' + name))
      }
    } else {
      const elementToRemoveSlice = getElementSlice(parameterSlice, validId, name)
      let newPath = pagePath.replace(parameterSlice, elementToRemoveSlice)
      if (newPath.includes('&&')) {
        newPath = newPath.replace('&&', '&')
      }
      if (newPath[newPath.length - 1] === '&') {
        void push(newPath.slice(0, -1))
      } else {
        void push(newPath)
      }
    }
  }

  return (
    <>
      <aside className={'Sidebar w-[13%] px-2 mt-0 bg-dark border-rr border-borders z-0'}>
        <form className={'sidebarForm flex flex-col w-[100%] rounded-xl pt-5 z-0'}>
          <div className={'preco flex flex-col w-full pb-5 border-b border-borders'}>
            <h1 className={'ml-5 text-md mt-3'}>Preço</h1>
            <div className={'w-[80%] ml-7 mt-8'}>
              <Slider
                value={price}
                onChange={handlePrice}
                // onMouseUp={filterPrice}
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

          <div className={'sidebar flex flex-col w-[100%] pb-5 overflow-y'}>
            <div className={'series flex flex-col w-[100%] mt-5 pb-6 mb-3 border-b border-borders overflow-y'}>
              <h1 className={'text-md ml-5 mb-5'}>Series</h1>
              {SeriesComponents.map((component) => (
                <div key={component.name} className={`${component.name} flex flex-col w-[100%] mt-0 pb-2 border-b/ border-borders overflow-y`}>
                  <div className={'flex flex-row'}>
                    <button className={'flex justify-center items-center ml-5 text-text'}>
                      <GoChevronRight
                        size={16}
                        // onClick={() => {
                        //   {}
                        // }}
                      />
                    </button>
                    <h1 className={'text-sm ml-1'}>{component.name}</h1>
                  </div>
                  <div className={'flex flex-col w-full ml-10 mt-3'}>
                    {component.models.map((model) => (
                      <div key={model} className={''}>
                        <label key={model} htmlFor={model} className={'font-normal flex items-center mb-2 w-[85%]'}>
                          <input
                            type="checkbox"
                            name={model}
                            id={'Modelos'}
                            onChange={onCheckboxChange}
                            className={
                              'flex h-4 w-4 font-normal mr-3 appearance-none checked:bg-[rgb(132,168,236)] rounded-sm border border-softWhite'
                            }
                          />
                          <h1 className={'text-xs opacity-[1] leading-6'}>{model.toUpperCase()}</h1>
                          {/* <h5
                            id="modelNumbers"
                            className={'ml-auto mr-5 text-xss text-text rounded-full text-center py-1/ px-2/ border-0 bg-black w-6 h-6 leading-6'}
                          >
                            {numbers(model, gpus, brands.names, models.names, series.names, stores.names)}
                          </h5> */}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {SidebarComponents.map((component) => (
              <div key={component.name} className={'series flex flex-col w-[100%] mt-5 pb-5 border-b border-borders overflow-y'}>
                <h1 className={'text-md ml-5'}>{component.name}</h1>
                <div className={'flex flex-col w-full ml-5 mt-3'}>
                  {component.elements.map((element) => (
                    <div key={element}>
                      <label key={element} htmlFor={element} className={'font-normal flex items-center mb-2 w-[85%]'}>
                        <input
                          type="checkbox"
                          name={element}
                          id={component.name}
                          onChange={onCheckboxChange}
                          className={
                            'checkInput flex h-4 w-4 font-normal mr-3 appearance-none checked:bg-[rgb(132,168,236)] rounded-sm border border-softWhite'
                          }
                        />
                        <h1 className={'text-xs opacity-[1] leading-6'}>{element}</h1>
                        {/* <h5
                          id="elementNumbers"
                          className={'ml-auto text-xss text-text rounded-full text-center py-1/ px-2/ border-0 bg-black w-6 h-6 leading-6'}
                        >
                          {numbers(element, gpus, brands.names, models.names, series.names, stores.names)}
                        </h5> */}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* <button type="submit">dale</button> */}
        </form>
      </aside>
    </>
  )
}

export default Sidebar

/*
 */
