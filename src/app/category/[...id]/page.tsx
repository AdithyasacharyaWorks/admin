import CategoryForm from '@/components/custom/CategoryForm'
import React from 'react'

const page = async ({ params }: any) => {
  const response = await fetch(`http://localhost:3000/api/category/${params.id}`, { cache: 'no-store' });
  const data =await  response.json()

  return (
    <div>
        <CategoryForm type='Edit' data={data}/>
    </div>
  )
}

export default page