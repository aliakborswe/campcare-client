import CampCard from "@/components/common/CampCard";
import Spinner from "@/components/common/Spinner";
import Wrapper from "@/components/common/Wrapper";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CampInterface } from "@/utils/campInterface";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";


const PopularCamps = () => {
    const [camps, setCamps] = useState<CampInterface[]>([]);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const fetchCamps = async () => {
        setLoading(true);
        try {
          const res = await axiosSecure.get("/topcamps");
          setCamps(res.data);
        } catch (err: any) {
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCamps();
    }, [axiosSecure]);

    if (loading) {
      return <Spinner />;
    }
    return (
      <section className="bg-primary/5">
        <Wrapper>
          <p className='text-center bg-accent w-44 rounded-bl-full rounded-tr-full text-white dark:text-black mb-2 py-1 mx-auto'>
            Camps
          </p>
          <h1 className='text-center text-xl md:text-2xl lg:text-3xl font-bold pb-8'>
            Popular Medical Camps
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {camps.map((camp) => (
              <CampCard key={camp._id} camp={camp} />
            ))}
          </div>
          <div className='flex justify-center mt-6'>
            <Link to={`/camps`}>
              <Button
                variant={"outline"}
                size={"lg"}
                className='border-accent text-black dark:text-white'
              >
                See all Camp
              </Button>
            </Link>
          </div>
        </Wrapper>
      </section>
    );
};

export default PopularCamps;