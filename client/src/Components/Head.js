import React from 'react'

function Head({title}) {
  return (
    <div className='w-full bg-dryGray h-40 lg:h-64 relative overflow-hidden rounded-md'>
        <img src='/images/head.png ' alt='About' className='w-full h-full object-cover'/>
        <div className='flex-cols w-full absolute lg:top-24 top-16'>
            <h1 className='text-2xl lg:text-h1 text-white text-center font-bold'>
                {title && title}
            </h1>
        </div>
    </div>
  )
}

export default Head