
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

type Role = {
  role : string;
};

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { data: role, isPending: roleLoading } = useQuery<Role>({
      queryKey: ["role"],
      queryFn: async () => {
        const res = await axiosSecure.get('/role');
        return res.data;
      },
    //   enabled: !!user?.email,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [role as any as string, roleLoading];
    
};

export default useRole;