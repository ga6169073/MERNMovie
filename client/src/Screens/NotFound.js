import React from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='w-full gap-8 flex-cols min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
      <img className='w-full h-96 object-contain' src='/images/404.png' alt='Not Found' />
      <h1 className='lg:text-4xl font-medium'>Page Not Found</h1>
      <p className='font-normal italic leading-6'>
        The page you are looking for does not exist. Please check the URL or go back to the homepage.
      </p>
      <Link to='/' className='bg-subMain transitions text-white flex-rows gap-4 font-light py-3 px-5 hover:text-main rounded-md'>
        <BiHomeAlt /> Home
      </Link>
    </div>
  )
}

export default NotFound