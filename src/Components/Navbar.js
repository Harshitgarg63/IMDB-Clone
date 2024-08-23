import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4 bg-gray-900'>
      <img src='https://seeklogo.com/images/I/imdb-logo-1CD1CCD432-seeklogo.com.png' alt='bg' className='w-[80px]' />

      <Link to={"./"}>
      <h3 className='text-blue-500'>Movies</h3>
      </Link>

      <Link to={"./WatchList"}>
      <h3 className='text-blue-500'>WatchList</h3>
      </Link>
    </div>
  )
}

export default Navbar
