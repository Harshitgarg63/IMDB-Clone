import React from 'react'

const Banner = () => {
  return (
    <div className='h-[60vh] md:h-[60vh] bg-center flex items-end bg-cover' style={{
        backgroundImage :`URL(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaVSWCaGAWiUF0P3OPwKFomwBtcc77AGc35w&s)` 
    }}>

        <div className='text-xl md:text-3xl bg-gray-900 bg-opacity-60 p-4 text-white text-center w-screen'>
            Movie Poster
        </div>
    </div>
  )
}

export default Banner
