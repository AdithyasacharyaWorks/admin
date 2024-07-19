import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/room-tables";

export async function GET(req: NextRequest,{params}:any) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  console.log(params.id[0])

  try {
    const response = await axios.get(`${API_BASE_URL}/${params.id[0]}`);
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    console.error(error);
    // if (error.response && error.response.status === 404) {
    //   return NextResponse.json({ status: 404, message: `Room Table with ID ${id} not found` });
    // }
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

export async function PUT(req: NextRequest,{params}:any) {
  try {
    const data = await req.json();
    const response = await axios.put(`${API_BASE_URL}/${params.id[0]}`, data);
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    console.error(error);
    // if (error.response && error.response.status === 404) {
    //   return NextResponse.json({ status: 404, message: `Room Table with ID ${id} not found` });
    // }
    return NextResponse.json({ status: 400, message:  "Internal Server Error" });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return NextResponse.json({ status: 204, message: `Room Table with ID ${id} successfully deleted` });
  } catch (error) {
    console.error(error);
    // if (error?.response && error?.response.status === 404) {
    //   return NextResponse.json({ status: 404, message: `Room Table with ID ${id} not found` });
    // }
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
