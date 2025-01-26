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
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Spinner from "@/components/common/Spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

type Camp = {
  _id: string;
  campName: string;
  campFees: number;
  participantName: string;
  paymentStatus: string;
  confirmationStatus: string;
};

const ManageRegisteredCamp = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const axiosSecure = useAxiosSecure();
  const { data, refetch, isLoading } = useQuery<Camp[]>({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosSecure("/participants");
      const data = res.data.map((d: any) => ({
        ...d,
        campName: d.campId.campName,
        campFees: d.campId.campFees,
      }));
      return data;
    },
  });

  // handle update ConfirmationStatus by id
  const updateConfirmStatus = async (id: string) => {
    axiosSecure
      .patch(`/participants/${id}`, { confirmationStatus: "Confirmed" })
      .then(() => {
        refetch();
        toast.success("Confirmation status updated successfully");
      })
      .catch((err: any) => toast.error(err.message));
  };

  // handle Delete button
  const handleDelete = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/participants/${id}`).then(() => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          });
        }
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const columns: ColumnDef<Camp>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "participantName",
      header: "Participant Name",
      cell: ({ row }) => <div>{row.getValue("participantName")}</div>,
    },
    {
      accessorKey: "campName",
      header: "Camp Name",
      cell: ({ row }) => {
        return <div>{row.original.campId?.campName}</div>;
      },
    },
    {
      accessorKey: "campFees",
      header: "Camp Fees",
      cell: ({ row }) => {
        return <div>{row.original.campId?.campFees}$</div>;
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => <div>{row.getValue("paymentStatus")}</div>,
    },
    {
      accessorKey: "confirmationStatus",
      header: "Confirmation Status",
      cell: ({ row }) => {
        const id = row.original._id; // Get the id of the current row
        return (
          <div>
            {row.original.paymentStatus !== "Paid" ? (
              <Button
                onClick={() => updateConfirmStatus(id)}
                variant={"default"}
              >
                {row.original.confirmationStatus}
              </Button>
            ) : (
              <div className='cursor-not-allowed'>
                {row.original.confirmationStatus}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "cancel",
      header: "Cancel",
      cell: ({ row }) => {
        const id = row.original._id; // Get the id of the current row
        return (
          <TableCell>
            {row.original.paymentStatus !== "Paid" ? (
              <Button onClick={() => handleDelete(id)} variant={"destructive"}>
                Cancel
              </Button>
            ) : (
              <div className='cursor-not-allowed'>N/A</div>
            )}
          </TableCell>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data ?? [],
    columns,
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

  if (!data) {
    return <Spinner />;
  }

  if (isLoading) {
    return <Spinner />;
  }
  if ((data?.length ?? 0) === 0) {
    return (
      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-red-500'>No data found</h1>
      </div>
    );
  }
  return (
    <div className='w-full p-6'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Search by CampName...'
          value={
            (table.getColumn("campName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("campName")?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
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

export default ManageRegisteredCamp;
