import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useCamps = () => {
    const axiosSecure = useAxiosSecure();
    const {data, refetch, isLoading} = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosSecure('/camps');
            return res.data;
        }
    })
    return [data, refetch, isLoading];
}

export default useCamps;