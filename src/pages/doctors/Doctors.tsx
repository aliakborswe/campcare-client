import { User, Stethoscope, CalendarCheck } from "lucide-react";
import Wrapper from "@/components/common/Wrapper";

// Doctor Data
const doctors = [
  {
    id: 1,
    name: "Dr. Sophia Carter",
    specialty: "Cardiologist",
    experience: "12 years",
    image: "",
  },
  {
    id: 2,
    name: "Dr. Ethan Williams",
    specialty: "Orthopedic Surgeon",
    experience: "10 years",
    image: "https://source.unsplash.com/200x200/?doctor,man",
  },
  {
    id: 3,
    name: "Dr. Olivia Thompson",
    specialty: "Pediatrician",
    experience: "8 years",
    image: "https://source.unsplash.com/200x200/?pediatrician",
  },
  {
    id: 4,
    name: "Dr. Noah Patel",
    specialty: "Dermatologist",
    experience: "9 years",
    image: "https://source.unsplash.com/200x200/?dermatologist",
  },
  {
    id: 5,
    name: "Dr. Emily Garcia",
    specialty: "Gynecologist",
    experience: "11 years",
    image: "https://source.unsplash.com/200x200/?gynecologist",
  },
  {
    id: 6,
    name: "Dr. Lucas Kim",
    specialty: "Neurologist",
    experience: "14 years",
    image: "https://source.unsplash.com/200x200/?neurologist",
  },
  {
    id: 7,
    name: "Dr. Ava Robinson",
    specialty: "Oncologist",
    experience: "13 years",
    image: "https://source.unsplash.com/200x200/?oncologist",
  },
  {
    id: 8,
    name: "Dr. Benjamin Lee",
    specialty: "General Surgeon",
    experience: "15 years",
    image: "https://source.unsplash.com/200x200/?surgeon",
  },
  {
    id: 9,
    name: "Dr. Mia Hernandez",
    specialty: "Endocrinologist",
    experience: "10 years",
    image: "https://source.unsplash.com/200x200/?endocrinologist",
  },
];

const Doctors = () => {
  return (
    <section className='bg-primary/5 py-10'>
      <Wrapper>
        <div className='text-center'>
          <p className='text-center bg-accent w-44 rounded-bl-full rounded-tr-full text-white dark:text-black mb-2 py-1 mx-auto'>
            Our Experts
          </p>
          <h1 className='text-xl md:text-2xl lg:text-3xl font-bold pb-8'>
            Meet Our Specialized Doctors
          </h1>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className='bg-white shadow-lg px-2 py-16 rounded-lg flex flex-col items-center transition-all hover:shadow-xl hover:-translate-y-1'
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className='rounded-full w-32 h-32 object-cover border border-primary'
              />
              <div>
                <h3 className='text-xl text-black font-semibold mt-4 flex items-center gap-2'>
                  <User className='text-primary' />
                  {doctor.name}
                </h3>
                <p className='text-muted-foreground flex items-center gap-2'>
                  <Stethoscope className='text-secondary' />
                  {doctor.specialty}
                </p>
                <p className='text-sm text-gray-500 flex items-center gap-2 mt-1'>
                  <CalendarCheck className='text-gray-400' />
                  {doctor.experience} experience
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default Doctors;
