import React from 'react'
import ListComponent from './list/listComponent'

const page = async() => {
  const response = await fetch('http://localhost:3000/api/category',{cache:'no-store'})
  const res =await response?.json()
  
  return (
    <div className='sm:px-10'>
      <ListComponent data={res?.data} type="category" />
    </div>
  )
}

export default page