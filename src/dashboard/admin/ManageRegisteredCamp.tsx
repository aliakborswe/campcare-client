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
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
interface Camp {
  _id: string;
  campId: {
    campName: string;
    campFees: number;
  };
  participantName: string;
  paymentStatus: string;
  confirmationStatus: string;
}

const ManageRegisteredCamp = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: registeredCamps,
    refetch,
    isLoading,
  } = useQuery<Camp[]>({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosSecure("/participants");
      return res.data;
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

  if (isLoading) {
    return <Spinner />;
  }
  if ((registeredCamps?.length ?? 0) === 0) {
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
          {registeredCamps?.map(
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
                <TableCell>
                  {paymentStatus !== "Paid" ? (
                    <Button
                      onClick={() => updateConfirmStatus(_id)}
                      variant={"default"}
                    >
                      {confirmationStatus}
                    </Button>
                  ) : (
                    <div className='cursor-not-allowed'>
                      {confirmationStatus}
                    </div>
                  )}
                </TableCell>
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
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageRegisteredCamp;
