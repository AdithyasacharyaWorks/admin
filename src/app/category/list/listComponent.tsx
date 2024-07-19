"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/Schemas/CategorySchema";
import { MenuItem } from "@/Schemas/MenuSchema";
import axios from "axios";
import { toast, Toaster } from "sonner";

const formatDate = (dateString: string) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  } as const;
  
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(new Date(dateString));
  
  // Manually format the time part to be separated by a space
  const [date, time] = formattedDate.split(", ");
  return `${date} ${time}`;
};

type ListData = Category | MenuItem;

const ListComponent = ({
  data,
  type,
}: {
  data: ListData[];
  type: "category" | "menu";
}) => {
  const router = useRouter();
  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/category/${id}`
      );
      toast.message("Sucess", {
        description: "deleted Category",
      });
      setTimeout(() => {
        router.refresh();
      }, 1000);
      router.refresh();
    } catch (error) {
      toast.message("Error", {
        description: "Error deleting",
      });
    }
  };

  const handleDeleteMenu = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/menu/${id}`);
      toast.message("Sucess", {
        description: "deleted Menu ",
      });
      router.refresh();
    } catch (error) {
      toast.message("Error", {
        description: "Error deleting",
      });
    }
  };
  const getColumns = (
    type: "category" | "menu",
    router: ReturnType<typeof useRouter>
  ): ColumnDef<ListData>[] => {
    if (type === "category") {
      return [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "description", header: "Description" },
        { accessorKey: "slug", header: "Slug" },
        {
          accessorKey: "createdAt",
          header: "Created At",
          cell: ({ getValue }) => formatDate(getValue() as string),
        },
        {
          accessorKey: "updatedAt",
          header: "Updated At",
          cell: ({ getValue }) => formatDate(getValue() as string),
        },
        {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const categoryItem = row.original as Category;

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      navigator.clipboard.writeText(categoryItem.id!)
                    }
                  >
                    Copy Category item ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(`/category/${categoryItem.id}`)}
                  >
                    View category item details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem onClick={() => router.push(`/category/${categoryItem.id}`)}> */}
                  <DropdownMenuItem
                    onClick={() => handleDeleteCategory(`${categoryItem.id}`)}
                  >
                    <span className="text-red-500">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ];
    } else {
      return [
        { accessorKey: "menuItemName", header: "Name" },
        { accessorKey: "menuDescription", header: "Description" },
        {
          accessorKey: "featured",
          header: "Featured",
          cell: ({ row }) =>
            (row.original as MenuItem).featured ? "Yes" : "No",
        },
        {
          accessorKey: "available",
          header: "Available",
          cell: ({ row }) => {
            const isAvailable = (row.original as MenuItem).available;
            return (
              <span className={isAvailable ? "text-green-500 font-bold" : "text-red-500"}>
                {isAvailable ? "Yes" : "No"}
              </span>
            );
          },
        },
        { accessorKey: "price", header: "Price" },
        {
          accessorKey: "createdAt",
          header: "Created At",
          cell: ({ getValue }) => formatDate(getValue() as string),
        },
        {
          accessorKey: "updatedAt",
          header: "Updated At",
          cell: ({ getValue }) => formatDate(getValue() as string),
        },
        { accessorKey: "category", header: "Category" },
        {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const menuItem = row.original as MenuItem;

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(menuItem.id!)}
                  >
                    Copy menu item ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(`/menu/${menuItem.id}`)}
                  >
                    View menu item details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDeleteMenu(menuItem?.id!)}
                  >
                    <span className="text-red-500">Delete Item</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ];
    }
  };
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Initialize useRouter hook

  const table = useReactTable({
    data,
    columns: getColumns(type, router), // Pass the router instance to columns function
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-4 mt-20">
      <Toaster className="mt-10 " position="top-center" />
      <div className="flex items-center py-4 gap-2">
        <div className="sm:flex sm:flex-row sm:gap-5 gap-5">
          <Input
            placeholder="Filter items..."
            value={
              (table
                .getColumn(type === "category" ? "name" : "menuItemName")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(type === "category" ? "name" : "menuItemName")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-md hidden sm:block"
          />
          {type === "menu" && (
            <Input
              placeholder="Filter by category..."
              value={
                (table.getColumn("category")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("category")?.setFilterValue(event.target.value)
              }
              className="max-w-md hidden sm:block"
            />
          )}
        </div>
        {type === "menu" && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-2 hidden sm:flex">
                  Featured <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={
                    table.getColumn("featured")?.getFilterValue() as boolean
                  }
                  onCheckedChange={(value) =>
                    table
                      .getColumn("featured")
                      ?.setFilterValue(value ? true : "")
                  }
                >
                  Show Featured
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-2 hidden sm:flex">
                  Available <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={
                    table.getColumn("available")?.getFilterValue() as boolean
                  }
                  onCheckedChange={(value) =>
                    table
                      .getColumn("available")
                      ?.setFilterValue(value ? true : "")
                  }
                >
                  Show Available
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        <DropdownMenu>
          {type === "category" && (
            <Button onClick={() => router.push("/category/add")}>
              Add Category
            </Button>
          )}
          {type === "menu" && (
            <Button onClick={() => router.push("/menu/add")}>
              Add Menu Item
            </Button>
          )}
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-auto hidden sm:flex">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                  {/* Add option to open a particular column */}
                  <DropdownMenuItem>Open {column.id}</DropdownMenuItem>
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of{" "}
          {table.getCoreRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
