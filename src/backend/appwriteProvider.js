import { Client, Account ,Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.PROJECT_ID);

export const database = new Databases(client)

export const account = new Account(client);
export { ID } from 'appwrite';

export const menuCollectionId = process.env.MENU_COLLECTION_ID
export const categoryCollectionId = process.env.CATEGORY_COLLECTION_ID
export const databaseId = process.env.DATBASE_ID
