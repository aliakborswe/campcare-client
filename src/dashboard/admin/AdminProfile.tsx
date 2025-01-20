
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  useQuery
} from "@tanstack/react-query";

type User = {
  email: string;
  name: string;
  photoURL: string;
  role: string;
  _id: string;
};
const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { data } = useQuery<User[]>({
      queryKey: ["user"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users`);
        return res.data;
    },
});

    return <div>AdminProfile AdminProfile user: {data?.length} </div>;
};

export default AdminProfile;