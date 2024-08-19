import React from 'react'
import { FiUser } from "react-icons/fi"
function Promos() {
  return (
    <div className='my-20 py-10 md:px-20 px-8 bg-dry'>
      <div className='lg:grid lg:grid-cols-2 lg:gap-10 items-center'>
        <div className='flex lg:gap-10 gap-6 flex-col'>
          <h1 className='xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed'>
            Download your movies <br /> Enjoy on your mobile
          </h1>
          <p className='text-text text-sm xl:text-base leading-6 xl:leading-8'>
            Qui ipsum aliqua occaecat ullamco aute dolore ipsum quis nisi nulla adipisicing irure aliquip laboris.
            Eu consequat nulla occaecat enim fugiat irure incididunt pariatur ipsum dolore sit in minim aliqua.
            Aliquip culpa consequat nostrud amet veniam incididunt eiusmod irure eu quis. Cupidatat cillum pariatur sint enim excepteur.
            Sint quis consectetur fugiat ex id proident est labore ea sint laboris qui. Et excepteur amet officia enim do.
            Adipisicing ipsum cupidatat anim culpa esse ipsum.
          </p>
          <div className='flex gap-4 md:text-lg text-sm'>
            <div className='flex-cols bg-black text-subMain px-6 py-3 rounded font-bold'>
              HD 4K
            </div>
            <div className='flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded font-bold'>
              <FiUser /> 2K
            </div>
          </div>
        </div>
        <div>
          <img src='/images/mobile.jpg' alt='Mobile app' className='w-full object-contain h-96' />
        </div>
      </div>
    </div>
  )
}

export default Promos