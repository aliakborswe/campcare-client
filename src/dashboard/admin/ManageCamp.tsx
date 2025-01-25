
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
import { ArrowUpDown, ChevronDown, Pencil, Trash2 } from "lucide-react";

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
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Spinner from "@/components/common/Spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";






type Camp = {
  _id: string;
  campName: string;
  date: string;
  time: string;
  location: string;
  healthcareProfessional: string;
};


const ManageCamp =()=> {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // 
  const [data, setData] = useState<Camp[]>([])
  const [loading, setLoading] = useState(false)
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()


    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const res = await axiosSecure.get("/camps");
          setData(res.data);
        } catch (err: any) {
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, [axiosSecure]);
 
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
      accessorKey: "campName",
      header: "Camp Name",
      cell: ({ row }) => <div>{row.getValue("campName")}</div>,
    },
    {
      accessorKey: "date",
      header: "Date & Time",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <div>{row.getValue("location")}</div>,
    },
    {
      accessorKey: "healthcareProfessional",
      header: "Healthcare Professional",
      cell: ({ row }) => <div>{row.getValue("healthcareProfessional")}</div>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const id = row.original._id; // Get the id of the current row
        return (
          <div className='flex divide-x-2 divide-emerald-400'>
            <span
              onClick={() => handleEdit(id)}
              className='cursor-pointer text-primary pr-2'
            >
              <Pencil />
            </span>

            <span
              onClick={() => handleDelete(id)}
              className='cursor-pointer text-red-500 pl-2'
            >
              <Trash2 />
            </span>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
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

   // handle Edit button
   const handleEdit = (id: string) => {
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to Update this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, Update it!",
     }).then((result) => {
       if (result.isConfirmed) {
         navigate(`/dashboard/update-camp/${id}`);
       }
     });
   };
 
   // handle Delete button
   const handleDelete = async (id: string) => {
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
           axiosSecure.delete(`/camps/${id}`).then(() => {
             setData(data.filter((camp) => camp._id !== id));
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

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='w-full p-6'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Search by CampName...'
          value={(table.getColumn("campName")?.getFilterValue() as string) ?? ""}
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
}

export default ManageCamp;