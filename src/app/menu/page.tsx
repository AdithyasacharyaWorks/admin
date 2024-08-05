import ListComponent from '@/app/category/list/listComponent'
const page = async () => {
  
  const response = await fetch('http://localhost:3000/api/menu',{cache:'no-store'})
  const res =await response.json()
  return (
    <ListComponent  data={res?.data} type='menu'/>
  )
}

export default page;