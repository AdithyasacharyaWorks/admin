import { NextRequest, NextResponse } from "next/server";
import { categoryCollectionId, database, databaseId, ID } from "@/backend/appwriteProvider";
import { Query } from "appwrite";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    try {
        if (params.id) {
            console.log("fetching single dagta")
            const response = await database.getDocument(databaseId!,categoryCollectionId!, params.id,[
                Query.select(['name','description','imageUrl','slug','$id','$createdAt','$updatedAt'])
            ]);
            return NextResponse.json({ status: 200, data: response });
        }
    } catch (error) {
        console.error("this is the error", error);
        return NextResponse.error();
    }
}
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    try {
        const data = await request.json();
        const response = await database.updateDocument(databaseId!,categoryCollectionId!, params.id, data,[Query.select(['name','description','imageUrl','slug','$id','$createdAt','$updatedAt'])]);
        return NextResponse.json({ status: 200, data: response });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        if (params.id) {
            await database.deleteDocument(databaseId!,categoryCollectionId!, params.id);
            return NextResponse.json({ status: 200, message: "Category deleted successfully" });
        } else {
            return NextResponse.json({ status: 400, message: "No ID provided" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
