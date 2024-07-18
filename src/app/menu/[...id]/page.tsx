import React from 'react'
import MenuItemForm from '@/components/custom/MenuForm'

const page =async ({params}:any) => {
  const data = await fetch(`http://localhost:8080/api/v1/menuItems/${params.id[0]}`,{cache:'no-store'})
  const resData = await data.json();
  console.log(resData)
  return (
    <MenuItemForm type="Edit" data={resData}/>
  )
}

export default page