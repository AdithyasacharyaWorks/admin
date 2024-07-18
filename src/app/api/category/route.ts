import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = 'http://localhost:8080/api/v1/Categories';

export async function GET() {
    try {
        const response = await axios.get(BASE_URL);
        return NextResponse.json({status: 200, data: response?.data});
    } catch (error) {
        return NextResponse.error();
    }
}

export async function POST(request:NextRequest) {
    try {
        const data = await request.json();
        const response = await axios.post(BASE_URL, data);
        return NextResponse.json({status: 201, data: response?.data});
    } catch (error) {
        return NextResponse.error();
    }
}



