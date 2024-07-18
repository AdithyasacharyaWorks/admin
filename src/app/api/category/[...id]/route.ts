import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = 'http://localhost:8080/api/v1/Categories';

export async function PUT(request:NextRequest) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;
        const response = await axios.put(`${BASE_URL}/${id}`, updateData);
        return NextResponse.json({status: 200, data: response?.data});
    } catch (error) {
        return NextResponse.error();
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const response = await axios.get(`${BASE_URL}/${params.id}`);
        return NextResponse.json({ status: 200, data: response?.data });
    } catch (error) {
        return NextResponse.error();
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // const { id } = await request.json();
        console.log(params.id)
        await axios.delete(`${BASE_URL}/${params.id}`);
        return NextResponse.json({status: 200, message: "Category deleted successfully"});
    } catch (error) {
        return NextResponse.error();
    }
}