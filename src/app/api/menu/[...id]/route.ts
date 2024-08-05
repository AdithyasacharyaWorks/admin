import { NextRequest, NextResponse } from 'next/server';
import { database,menuCollectionId,databaseId } from '@/backend/appwriteProvider'; // Adjust path if necessary
import { ID } from 'appwrite';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await database.getDocument(
      databaseId!,
      menuCollectionId!,
      params.id
    );
    return NextResponse.json({ status: 200, data: response });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    const documentId=id
    console.log(id)
    const response = await database.updateDocument(
      databaseId!,
      menuCollectionId!,
      documentId,
      updateData
    );
    return NextResponse.json({ status: 200, data: response });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await database.deleteDocument(
      databaseId!,
      menuCollectionId!,
      params.id
    );
    return NextResponse.json({ status: 200, message: 'Data has been deleted successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
