import { NextRequest, NextResponse } from 'next/server';
import { database, databaseId, menuCollectionId } from '@/backend/appwriteProvider'; // Adjust path if necessary
import { Query, ID } from 'appwrite';

export async function GET() {
  try {
    // Fetch menu items from Appwrite
    const response = await database.listDocuments(
      databaseId!,
      menuCollectionId!,
      [Query.select(['menuItemName','menuDescription','imageUrl','featured','available','category','price','tags','labels','$id','$createdAt','$updatedAt'])]
    );
    return NextResponse.json({ status: 200, data: response.documents });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Create a new menu item in Appwrite
    const response = await database.createDocument(
      databaseId!,
      menuCollectionId!,
      ID.unique(),
      data,
      [Query.select(['menuItemName','menuDescription','imageUrl','featured','available','category','price','tags','labels','$id','$createdAt','$updatedAt'])]

    );
    return NextResponse.json({ status: 201, data: response });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    // Update an existing menu item in Appwrite
    const response = await database.updateDocument(
      databaseId!,
      menuCollectionId!,
      id,
      updateData,
      [Query.select(['menuItemName','menuDescription','imageUrl','featured','available','category','price','tags','labels','$id','$createdAt','$updatedAt'])]
    );
    return NextResponse.json({ status: 200, data: response });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
