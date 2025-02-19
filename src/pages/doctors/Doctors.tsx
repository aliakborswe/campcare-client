import { User, Stethoscope, CalendarCheck } from "lucide-react";
import Wrapper from "@/components/common/Wrapper";

// Doctor Data
const doctors = [
  {
    id: 1,
    name: "Dr. Sophia Carter",
    specialty: "Cardiologist",
    experience: "12 years",
    image:
      "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jdG9yfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Dr. Ethan Williams",
    specialty: "Orthopedic Surgeon",
    experience: "10 years",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9jdG9yfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Dr. Olivia Thompson",
    specialty: "Pediatrician",
    experience: "8 years",
    image:
      "https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    name: "Dr. Noah Patel",
    specialty: "Dermatologist",
    experience: "9 years",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 5,
    name: "Dr. Emily Garcia",
    specialty: "Gynecologist",
    experience: "11 years",
    image:
      "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    name: "Dr. Lucas Kim",
    specialty: "Neurologist",
    experience: "14 years",
    image:
      "https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 7,
    name: "Dr. Ava Robinson",
    specialty: "Oncologist",
    experience: "13 years",
    image:
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 8,
    name: "Dr. Benjamin Lee",
    specialty: "General Surgeon",
    experience: "15 years",
    image:
      "https://plus.unsplash.com/premium_photo-1661766569022-1b7f918ac3f3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 9,
    name: "Dr. Mia Hernandez",
    specialty: "Endocrinologist",
    experience: "10 years",
    image:
      "https://plus.unsplash.com/premium_photo-1723514536306-26fe5c4adeb7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
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
                className='rounded-full w-44 h-44 object-cover border border-primary'
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
