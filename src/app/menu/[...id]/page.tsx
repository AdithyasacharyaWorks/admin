import React from 'react'
import MenuItemForm from '@/components/custom/MenuForm'

const page =async ({params}:any) => {
  console.log(params)
  const data = await fetch(`http://localhost:3000/api/menu/${params.id[0]}`,{cache:'no-store'})
  const resData = await data.json();
  console.log(resData)
  return (
    <MenuItemForm type="Edit" data={resData.data}/>
  )
}

export default page