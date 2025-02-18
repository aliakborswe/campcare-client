import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useCamps = () => {
    const axiosSecure = useAxiosSecure();
    const {data: camps, refetch, isLoading} = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosSecure('/camps');
            return res.data;
        }
    })
    return [camps, refetch, isLoading];
}

export default useCamps;