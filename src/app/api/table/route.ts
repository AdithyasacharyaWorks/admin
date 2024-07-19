import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/room-tables";

// GET all room tables
export async function GET() {
  try {
    const response = await axios.get(API_BASE_URL);
    if (response.data.length === 0) {
      return NextResponse.json({ status: 404, message: "No data available for Room Tables" });
    }
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

// POST create a new room table
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const response = await axios.post(API_BASE_URL, data);
    return NextResponse.json({ status: 201, data: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: "Invalid Room Table data provided" });
  }
}

