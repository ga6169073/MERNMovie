import React from 'react'
import { FaRegCalendarAlt, } from 'react-icons/fa'
import { BiTime } from 'react-icons/bi'
function FlexMovieItems({ movie }) {
    return (
        <>
            <div className='flex items-center gap-1.5'>
                <span className='text-sm font-medium'>
                    {movie.category}
                </span>
            </div>
            <div className='flex items-center gap-1.5'>
                <FaRegCalendarAlt className='text-subMain w-3 h-3' />
                <span className='text-sm font-medium'>
                    {movie.year}
                </span>
            </div>
            <div className='flex items-center gap-1.5'>
                <BiTime className='text-subMain w-3 h-3' />
                <span className='text-sm font-medium'>
                    {movie.time} Hr
                </span>
            </div>
        </>
    )
}

export default FlexMovieItems