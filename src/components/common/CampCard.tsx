import { CampInterface } from "@/utils/campInterface";
import { Link } from "react-router";
import { Button } from "../ui/button";

interface CampCardProps {
  camp: CampInterface;
}

const CampCard = ({ camp }: CampCardProps) => {
  return (
    <div className='border w-full p-4 rounded shadow space-y-1'>
      <img
        src={camp.image}
        alt={camp.campName}
        className='w-full h-48 object-cover rounded'
      />
      <h2 className='text-xl font-bold mt-2'>{camp.campName}</h2>
      <div className='flex gap-4'>
        <p>
          <strong>Data: </strong>
          {camp.time} am
        </p>
        <p>{camp.date}</p>
      </div>
      <p>
        <strong>Location: </strong>
        {camp.location}
      </p>
      <p>
        <strong>Healthcare Professional:</strong> {camp.healthcareProfessional}
      </p>
      <p>
        <strong>Camp Fees:</strong> {camp.campFees}$
      </p>
      <p>
        <strong>Participants:</strong> {camp.participantCount}
      </p>
      <Link to={`/camps/${camp._id}`}>
        <Button className='mt-4 w-full'>Details</Button>
      </Link>
    </div>
  );
};

export default CampCard;