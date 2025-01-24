import Spinner from "@/components/common/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface History {
  id: string;
  campName: string;
  campFees: string;
  paymentStatus: string;
  confirmationStatus: string;
}

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/payment-history?email=${user?.email}`
        );
        setPaymentHistory(res.data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosSecure, user?.email]);

  if (loading) {
    return <Spinner />;
  }
  if (paymentHistory.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-red-500'>No data found</h1>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold text-center border-b py-4'>
        Payment History
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Camp Name</TableHead>
            <TableHead>Camp Fees</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Confirmation Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentHistory.map(
            (
              { id, campName, campFees, paymentStatus, confirmationStatus },
              index
            ) => (
              <TableRow key={id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{campName}</TableCell>
                <TableCell>{campFees}$</TableCell>
                <TableCell>{paymentStatus}$</TableCell>
                <TableCell>{confirmationStatus}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistory;
