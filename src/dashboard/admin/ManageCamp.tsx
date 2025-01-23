import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
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
import { CampInterface } from "@/utils/campInterface";
import { useNavigate } from "react-router";

const ManageCamp = () => {
  const [camps, setCamps] = useState<CampInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/camps");
        setCamps(res.data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosSecure]);

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
        navigate(`/update-camp/${id}`);
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
            setCamps(camps.filter((camp) => camp._id !== id));
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
  if (camps.length === 0) {
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
            <TableHead>Data & Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Healthcare Professional</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {camps.map(
            (
              { _id, campName, date, time, location, healthcareProfessional },
              index
            ) => (
              <TableRow key={_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{campName}</TableCell>
                <TableCell>
                  {date}
                  {time}
                </TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{healthcareProfessional}</TableCell>
                <TableCell className='flex divide-x-2 divide-emerald-400'>
                  <span
                    onClick={() => handleEdit(_id)}
                    className='cursor-pointer text-primary pr-2'
                  >
                    <Pencil />
                  </span>

                  <span
                    onClick={() => handleDelete(_id)}
                    className='cursor-pointer text-red-500 pl-2'
                  >
                    <Trash2 />
                  </span>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageCamp;
