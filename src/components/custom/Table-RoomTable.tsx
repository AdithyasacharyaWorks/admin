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
import axios from "axios";
import { toast, Toaster } from "sonner";
import { roomTableSchema } from "@/Schemas/TableSchema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { z } from "zod";

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

type RoomData = z.infer<typeof roomTableSchema>;

const TableRoomComponent = ({ data }: { data: RoomData[] }) => {
  const router = useRouter();

  const handleDeleteRoom = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/room/${id}`);
      toast.message("Success", {
        description: "Deleted room",
      });
      router.refresh();
    } catch (error) {
      toast.message("Error", {
        description: "Error deleting",
      });
    }
  };

  const getColumns = (): ColumnDef<RoomData>[] => {
    return [
      { accessorKey: "tableNumberOrRoomNumber", header: "Room/Table Number" },
      { accessorKey: "tableOrRoomName", header: "Name" },
      { accessorKey: "roomNumber", header: "Room Number" },
      { accessorKey: "capacity", header: "Capacity" },
      { accessorKey: "floor", header: "Floor" },
      {
        accessorKey: "occupied",
        header: "Occupied",
        cell: ({ row }) =>
          row.original.occupied ? "Yes" : "No",
      },
      { accessorKey: "notes", header: "Notes" },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const room = row.original;

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
                  onClick={() => navigator.clipboard.writeText(room.id!)}
                >
                  Copy Room/Table ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push(`/table/${room.id}`)}
                >
                  View room details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDeleteRoom(room.tableNumberOrRoomNumber!)}
                >
                  <span className="text-red-500">Delete Room</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: getColumns(),
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
                .getColumn("tableNumberOrRoomNumber")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("tableNumberOrRoomNumber")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-md hidden sm:block"
          />
          <Input
            placeholder="Filter by capacity..."
            value={
              (table.getColumn("capacity")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("capacity")?.setFilterValue(event.target.value)
            }
            className="max-w-md hidden sm:block"
          />
        </div>
        <DropdownMenu>
          <Button onClick={() => router.push("/table")}>
            Add Table
          </Button>
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

export default TableRoomComponent
