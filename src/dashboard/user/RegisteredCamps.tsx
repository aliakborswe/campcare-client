import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Spinner from "@/components/common/Spinner";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";

const feedbackSchema = z.object({
  feedback: z.string().min(1, { message: "Feedback is required" }),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
});

const RegisteredCamps = () => {
  const [registeredCamps, setRegisteredCamps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(user?.photoURL)

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
      form.reset()
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/registered-camps?email=${user?.email}`
        );
        setRegisteredCamps(res.data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosSecure, user?.email]);

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
            setRegisteredCamps(
              registeredCamps.filter((camp) => camp._id !== id)
            );
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
  if (registeredCamps.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-red-500'>No data found</h1>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Camp Name</TableHead>
            <TableHead>Camp Fees</TableHead>
            <TableHead>Participant Name</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Confirmation Status</TableHead>
            <TableHead>Cancel Button</TableHead>
            <TableHead>Feedback Button</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registeredCamps.map(
            (
              {
                _id,
                campId,
                participantName,
                paymentStatus,
                confirmationStatus,
              },
              index
            ) => (
              <TableRow key={_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{campId?.campName}</TableCell>
                <TableCell>{campId?.campFees}$</TableCell>
                <TableCell>{participantName}</TableCell>
                <TableCell>
                  {paymentStatus === "Paid" ? (
                    <div className='bg-green-500 text-black w-12 text-center py-1 rounded-sm cursor-not-allowed'>
                      Paid
                    </div>
                  ) : (
                    <Link
                      to={`/dashboard/payment/${_id}`}
                      className='bg-primary text-white dark:text-black text-center py-1 px-3.5 rounded-sm cursor-pointer'
                    >
                      Pay
                    </Link>
                  )}
                </TableCell>
                <TableCell>{confirmationStatus}</TableCell>
                <TableCell>
                  {paymentStatus !== "Paid" ? (
                    <Button
                      onClick={() => handleDelete(_id)}
                      variant={"destructive"}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <div className='cursor-not-allowed'>N/A</div>
                  )}
                </TableCell>
                <TableCell>
                  {paymentStatus === "Paid" ? (
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
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegisteredCamps;
