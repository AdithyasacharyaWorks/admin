// import {database} from "./appwriteProvider"
// import { Query } from "appwrite"


// function getCollectionId(collection){
//     if(collection === "Menu"){
//         return process.env.MENU_COLLECTION_ID
//     }

//     if(collection === "Category"){
//         return process.env.CATEGORY_COLLECTION_ID
//     }

// }

// export function Create(collection,data,id){

//     database.createDocument(process.env.DATBASE_ID)
// }

// export function Update(collection,data,id){
//     database.updateDocument(process.env.DATBASE_ID)
// }

// export async function Get(collection,data,id){
//     const colId = getCollectionId(collection)
//     return await database.listDocuments(process.env.DATBASE_ID,colId,[Query.select('')])
// }

// export function Delete(collection,data,id){
//     database.deleteDocument(process.env.DATBASE_ID)
// }
