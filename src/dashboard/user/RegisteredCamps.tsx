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
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Spinner from "@/components/common/Spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "@/hooks/useAuth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";

const feedbackSchema = z.object({
  feedback: z.string().min(1, { message: "Feedback is required" }),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
});

type Camp = {
  _id: string;
  campName: string;
  campFees: string;
  participantName: string;
  paymentStatus: string;
  confirmationStatus: string;
};

const RegisteredCamps = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  //
  const [data, setData] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedback: "",
      rating: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof feedbackSchema>) => {
    setIsSubmitting(true);

    try {
      const feedbackData = {
        userName: user?.displayName || "anonymous",
        userEmail: user?.email || "anonymous",
        feedback: values.feedback,
        rating: Number(values.rating),
      };
      await axiosSecure.post("/feedback", feedbackData);
      toast.success("Feedback Submit successfully");
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // load data form server
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/registered-camps?email=${user?.email}`
        );
        // setData(res.data);
        const data = res.data.map((d: any) => ({
          ...d,
          campName: d.campId.campName,
          campFees: d.campId.campFees,
        }));
        setData(data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosSecure, user?.email]);

  // Colum Def
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
      cell: ({ row }) => <div>{row.original.campName}</div>,
    },
    {
      accessorKey: "campFees",
      header: "campFees",
      cell: ({ row }) => <div>{row.original.campFees}$</div>,
    },
    {
      accessorKey: "participantName",
      header: "Participant Name",
      cell: ({ row }) => <div>{row.getValue("participantName")}</div>,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <div>
            {row.original.paymentStatus === "Paid" ? (
              <div className='bg-green-500 text-black w-12 text-center py-1 rounded-sm cursor-not-allowed'>
                Paid
              </div>
            ) : (
              <Link
                to={`/dashboard/payment/${id}`}
                className='bg-primary text-white dark:text-black text-center py-1 px-3.5 rounded-sm cursor-pointer'
              >
                Pay
              </Link>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "confirmationStatus",
      header: "Confirmation Status",
      cell: ({ row }) => <div>{row.getValue("confirmationStatus")}</div>,
    },
    {
      accessorKey: "cancel",
      header: "Cancel Button",
      cell: ({ row }) => {
        const id = row.original?._id;
        return (
          <div>
            {row.original?.paymentStatus !== "Paid" ? (
              <Button onClick={() => handleDelete(id)} variant={"destructive"}>
                Cancel
              </Button>
            ) : (
              <div className='cursor-not-allowed'>N/A</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "feedback",
      header: "Feedback Button",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.paymentStatus === "Paid" ? (
              <Popover>
                <PopoverTrigger>
                  <div className='bg-primary text-white dark:text-black py-2 px-4 rounded-md font-semibold'>
                    Feedback
                  </div>
                </PopoverTrigger>
                <PopoverContent className='p-0 mr-12'>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-4 bg-white p-6 rounded-lg shadow-lg'
                    >
                      {/* Feedback Textarea */}
                      <FormField
                        control={form.control}
                        name='feedback'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Feedback</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder='Write your feedback here...'
                                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Rating Component */}
                      <FormField
                        control={form.control}
                        name='rating'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                min={1}
                                max={5}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                className='mt-1 p-1 block w-full border rounded-md shadow-sm'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full'
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    </form>
                  </Form>
                </PopoverContent>
              </Popover>
            ) : (
              <div className='cursor-not-allowed'>N/A</div>
            )}
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
          axiosSecure.delete(`/participants/${id}`).then(() => {
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
  if (data.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-red-500'>No data found</h1>
      </div>
    );
  }

  return (
    <div className='w-full p-6'>
      <Helmet>
        <title>Registered Camps | Dashboard</title>
      </Helmet>
      <div className='flex gap-4 items-center py-4'>
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

export default RegisteredCamps;
