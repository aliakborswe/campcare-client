import useAxiosSecure from "@/hooks/useAxiosSecure";
import { HeartPulse, Users } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [campsLength, setCampsLength] = useState<number>(0);
    const [participantsLength, setParticipantsLength] = useState<number>(0);
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
        const fetchCampsLength = async()=>{
            try {
                const resOne = await axiosSecure.get("/camps-length");
                const resTwo = await axiosSecure.get("/participants-length");
                setCampsLength(resOne.data);
                setParticipantsLength(resTwo.data);
            } catch (error) {
                console.error("Error fetching camps length:", error);
            }
        }
        fetchCampsLength();
    },[ axiosSecure]);
    return (
      <div className='px-4 pt-6 flex flex-col md:flex-row gap-8'>
        {/* cards and charts */}
        <div className='w-full md:w-2/3 text-black'>
          <div className='flex gap-4 justify-between'>
            <div className='bg-white shadow-lg rounded-md w-full p-6'>
              <div className=' flex items-center gap-4 justify-between text-xl font-bold'>
                <h1>Total Camp</h1>
                <HeartPulse className='text-red-500 mt-1' />
              </div>
              <h1 className='text-3xl font-bold text-yellow-500 pt-3'>
                {campsLength}
              </h1>
            </div>
            <div className='bg-white shadow-lg rounded-md w-full p-6'>
              <div className=' flex items-center gap-4 justify-between text-xl font-bold'>
                <h1>Total Participant</h1>
                <Users className='text-red-500 mt-1' />
              </div>
              <h1 className='text-3xl font-bold text-yellow-500 pt-3'>
                {participantsLength}
              </h1>
            </div>
          </div>
          <div></div>
        </div>
        {/* Feedback and Rating */}
        <div className='w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md'>
          <h1 className='text-xl font-bold'>Feedback</h1>
        </div>
      </div>
    );
};

export default Dashboard;