import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { categoryCollectionId, database, databaseId, ID } from "@/backend/appwriteProvider"
import { Query } from "appwrite";

const BASE_URL = 'http://localhost:8080/api/v1/Categories';

export async function GET() {
    try {
        // const response = await axios.get(BASE_URL);
        const response = await database.listDocuments(databaseId!, categoryCollectionId!, [
            Query.select(['name', 'description', 'imageUrl', 'slug', '$id', '$createdAt', '$updatedAt'])
        ])
        return NextResponse.json({ status: 200, data: response?.documents });
    } catch (error) {
        return NextResponse.error();
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const response = await database.createDocument(databaseId!, categoryCollectionId!, ID.unique(), data, [Query.select(['name', 'description', 'imageUrl', 'slug', '$id', '$createdAt', '$updatedAt'])
        ])
        // const response = await axios.post(BASE_URL, data);
        return NextResponse.json({ status: 201, data: response?.data });
    } catch (error) {
        console.log(error)
        return NextResponse.error();
    }
}



