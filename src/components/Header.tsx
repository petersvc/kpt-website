import React from 'react'

import { MdOutlineDarkMode } from 'react-icons/md'
import { GiEvilLove } from 'react-icons/gi'
import { RiMenu5Fill } from 'react-icons/ri'

const Header: React.FC = () => {
  return (
    <header className={'header h-12 w-[100%] flex items-center sticky z-10 bg-dark shadow-md shadow-[rgb(28,28,28)]'}>
      <div className={'flex w-[3%] items-center h-full border-r border-borders'}>
        <button className={'flex justify-center items-center w-full h-full text-text'}>
          <RiMenu5Fill size={22} />
        </button>
      </div>

      <div className={'flex w-[94%] justify-center items-center h-full bg-[rgb(38,38,43)]a border-r border-borders'}>
        <button className={'flex justify-center items-center w-full h-full text-text'}>
          <GiEvilLove size={28} />
        </button>
      </div>

      <div className={'flex w-[3%] h-full justify-end items-center mr-3a'}>
        <div className={'flex justify-between items-center w-[100%] h-full text-text border-r border-borders'}>
          <button className={'flex justify-center items-center w-full h-full text-text'}>
            <MdOutlineDarkMode size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
