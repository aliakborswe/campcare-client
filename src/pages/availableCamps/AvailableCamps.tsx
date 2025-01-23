import Wrapper from "@/components/common/Wrapper";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CampInterface } from "@/utils/campInterface";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/common/Spinner";
import CampCard from "@/components/common/CampCard";

const AvailableCamps = () => {
  const [camps, setCamps] = useState<CampInterface[]>([]);
  const [filteredCamps, setFilteredCamps] = useState<CampInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [layout, setLayout] = useState("three-column");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCamps = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/camps`);
        setCamps(res.data);
        setFilteredCamps(res.data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCamps();
  }, [axiosSecure]);

  useEffect(() => {
    const filtered = camps.filter(
      (camp) =>
        camp.campName.toLowerCase().includes(search.toLowerCase()) ||
        camp.location.toLowerCase().includes(search.toLowerCase()) ||
        camp.healthcareProfessional
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    if (sortCriteria === "most-registered") {
      filtered.sort((a, b) => b.participantCount - a.participantCount);
    } else if (sortCriteria === "camp-fees") {
      filtered.sort((a, b) => a.campFees - b.campFees);
    } else if (sortCriteria === "alphabetical") {
      filtered.sort((a, b) => a.campName.localeCompare(b.campName));
    }

    setFilteredCamps(filtered);
  }, [search, sortCriteria, camps]);

  const handleLayoutToggle = () => {
    setLayout(layout === "three-column" ? "two-column" : "three-column");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='Search camps...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border p-2 rounded-md w-32 sm:w-56'
        />
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className='border p-2 rounded-md w-32 sm:w-56'
        >
          <option value=''>Sort By</option>
          <option value='most-registered'>Most Registered</option>
          <option value='camp-fees'>Camp Fees(L-H)</option>
          <option value='alphabetical'>Alphabetical Order(A-Z)</option>
        </select>
        <div className="hidden lg:block">
          <Button onClick={handleLayoutToggle}>
            {layout === "three-column"
              ? "Two Column Layout"
              : "Three Column Layout"}
          </Button>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 lg:${
          layout === "three-column" ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        {
          filteredCamps.map((camp) => <CampCard key={camp._id} camp={camp} />)
        }
      </div>
    </Wrapper>
  );
};

export default AvailableCamps;
