import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://camp-care-server.vercel.app/api/v1",
});
const useAxiosPublic = () => {
    return axiosInstance;
};

export default useAxiosPublic;