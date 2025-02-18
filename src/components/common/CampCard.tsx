import { CampInterface } from "@/utils/campInterface";
import { Link } from "react-router";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  CalendarDays,
  CircleDollarSign,
  MapPin,
  Stethoscope,
} from "lucide-react";

interface CampCardProps {
  camp: CampInterface;
}

const CampCard = ({ camp }: CampCardProps) => {
  return (
    <Card className='flex flex-col gap-2 border-none justify-between shadow-xl shadow-primary/20'>
      <CardHeader className='p-0'>
        <CardTitle>
          <img
            src={camp.image}
            alt={camp.campName}
            className='w-full h-48 object-cover rounded'
          />
        </CardTitle>
        <CardDescription>
          <h2 className='text-xl font-bold px-4'>{camp.campName}</h2>
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-1 [&_div]:flex [&_div]:items-center [&_div]:gap-1 p-0 px-4'>
        <div className=' '>
          <CalendarDays size={20} />
          {camp.date}
        </div>
        <div>
          <MapPin size={20} />
          {camp.location}
        </div>
        <div>
          <Stethoscope size={20} />
          {camp.healthcareProfessional}
        </div>
        <div>
          <CircleDollarSign size={20} />
          {camp.campFees}$
        </div>
        <p>{camp.description.slice(0, 70)}...</p>
      </CardContent>
      <CardFooter className='p-0'>
        <Link to={`/camps/${camp._id}`} className='w-full'>
          <Button className='w-full'>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CampCard;
