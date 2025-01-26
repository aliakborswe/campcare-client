import Profile from "@/components/common/profile/Profile";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { UserType } from "@/utils/userType";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery<UserType>({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <Helmet>
        <title>User Profile | Dashboard</title>
      </Helmet>
      {data && <Profile data={data} refetch={refetch} />}
    </div>
  );
};

export default UserProfile;
