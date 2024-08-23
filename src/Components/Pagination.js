import React from 'react'

const Pagination = (props) => {
    let{pageNumProp,onNextProp,onPrevProp} = props
  return (
    <>
    <div className='flex justify-center my-4 cursor-pointer'>
        <div className='border-2 border-r-0 p-2 rounded-l-xl border-blue-500 text-white' onClick={onPrevProp}>
            prev
            </div>
        <div className='border-2 border-blue-400 border-r-0 p-2 text-white'>
{pageNumProp}
        </div>
<div onClick={onNextProp} className='border-2 border-r-1 p-2 rounded-r-xl border-blue-500 cursor-pointer text-white'>
    next
    </div>
    </div>
    </>
  )
}

export default Pagination
