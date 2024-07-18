import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/menuItems');
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {

    const data = await req.json();
    console.log(data)
    const response = await axios.post('http://localhost:8080/api/v1/menuItems', data);
    return NextResponse.json({ status: 201, data: response.data });
  } catch (error) {
    console.log(error)
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id } = data;
    const response = await axios.put(`http://localhost:8080/api/v1/menuItems/${id}`, data);
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
