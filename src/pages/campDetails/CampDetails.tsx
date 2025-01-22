import Spinner from "@/components/common/Spinner";
import Wrapper from "@/components/common/Wrapper";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CampInterface } from "@/utils/campInterface";
import { useEffect, useState } from "react";
import {  useParams } from "react-router";
import { toast } from "react-toastify";

const CampDetails = () => {
      const [camp, setCamp] = useState<CampInterface>( {} as CampInterface);
      const [loading, setLoading] = useState(false);
      const axiosSecure = useAxiosSecure();
      const { id } = useParams<{ id: string }>();

      useEffect(() => {
        const fetchCamp = async () => {
          setLoading(true);
          try {
            const res = await axiosSecure.get(`/camps/${id}`);
            setCamp(res.data);
          } catch (err: any) {
            toast.error(err.message);
          } finally {
            setLoading(false);
          }
        };

        fetchCamp();
      }, [axiosSecure, id]);

        if (loading) {
          return <Spinner />;
        }
        if (!camp) {
          return <div>Camp not found</div>;
        }
    return (
      <Wrapper>
        <div className='border flex flex-col sm:flex-row items-center gap-6 p-4 rounded shadow-lg'>
          <div className='w-full sm:w-1/3'>
            <img
              src={camp.image}
              alt={camp.campName}
              className='aspect-video rounded'
            />
          </div>
          <div className='w-full sm:w-2/3 space-y-1'>
            <h2 className='text-xl font-bold pb-2'>{camp.campName}</h2>
            <div className='flex gap-4'>
              <p>{camp.time}</p>
              <p>{camp.date}</p>
            </div>
            <p>{camp.location}</p>
            <p>Healthcare Professional: {camp.healthcareProfessional}</p>
            <p>Participants: {camp.participantCount}</p>
            <p>{camp.description}</p>
          </div>
        </div>
      </Wrapper>
    );
};

export default CampDetails;