import RoomTableForm from "@/components/custom/RoomTableForm";

const page = async ({ params }: any) => {
  const response = await fetch(
    `http://localhost:3000/api/table/${params.id[0]}`,
    { cache: "no-store" }
  );
  const data = await response.json();

  return (
    <div>
      <RoomTableForm type="Edit" data={data?.data} />
    </div>
  );
};

export default page;
