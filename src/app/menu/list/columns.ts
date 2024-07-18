import { ColumnDef } from "@tanstack/react-table";
import {MenuItem} from "@/Schemas/MenuSchema"
export const columns: ColumnDef<MenuItem>[] = [
    {
      accessorKey: "menuItemName",
      header: "Name",
    },
    {
      accessorKey: "menuDescription",
      header: "Description",
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
    },
    {
      accessorKey: "isAvailable",
      header: "Available",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
  ];