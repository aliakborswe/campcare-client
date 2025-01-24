import { useEffect, useState } from "react";
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

const ManageRegisteredCamp = () => {
  const [registeredCamps, setRegisteredCamps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          "/participants"
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
            <TableHead>Participant Name</TableHead>
            <TableHead>Camp Name</TableHead>
            <TableHead>Camp Fees</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Confirmation Status</TableHead>
            <TableHead>Cancel</TableHead>
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
                <TableCell>{participantName}</TableCell>
                <TableCell>{campId?.campName}</TableCell>
                <TableCell>{campId?.campFees}$</TableCell>
                <TableCell>{paymentStatus}</TableCell>
                <TableCell>{confirmationStatus}</TableCell>
                <TableCell>
                  {confirmationStatus !== "Confirmed" ? (
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
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageRegisteredCamp;
