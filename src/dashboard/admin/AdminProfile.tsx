
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  useQuery
} from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
  // Add other user properties here
};
const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { data } = useQuery<User[]>({
      queryKey: ["user"],
        queryFn: async () => {
          const res = await axiosSecure.get("/users");
          return res.data;
        },
    
    });
    return <div>AdminProfile AdminProfile user : {data?.length}</div>;
};

export default AdminProfile;