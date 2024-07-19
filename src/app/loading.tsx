import Loaders from '@/components/custom/Loaders'
import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center items-center mt-44'>
      <Loaders />
    </div>
  )
}

export default loading