import TableRoomComponent from "@/components/custom/Table-RoomTable"
export default async function Home() {

  const response = await fetch("http://localhost:3000/api/table",{cache:'no-store'})

  const data = await response.json()
  return (
    <TableRoomComponent data={data?.data}/>
  );
}