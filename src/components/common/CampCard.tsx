import { CampInterface } from "@/utils/campInterface";
import { Link } from "react-router";
import { Button } from "../ui/button";

interface CampCardProps {
  camp: CampInterface;
}

const CampCard = ({ camp }: CampCardProps) => {
  return (
    <div className='border p-4 rounded shadow space-y-1'>
      <img
        src={camp.image}
        alt={camp.campName}
        className='w-full h-48 object-cover rounded'
      />
      <h2 className='text-xl font-bold mt-2'>{camp.campName}</h2>
      <div className="flex gap-4">
        <p>{camp.time}</p>
        <p>{camp.date}</p>
      </div>
      <p>{camp.location}</p>
      <p>Healthcare Professional: {camp.healthcareProfessional}</p>
      <p>Participants: {camp.participantCount}</p>
      <p>{camp.description}</p>
      <Link to={`/camps/${camp._id}`}>
        <Button className='mt-4 w-full'>Details</Button>
      </Link>
    </div>
  );
};

export default CampCard;