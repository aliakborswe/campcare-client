import Wrapper from "@/components/common/Wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, HeartPulse, Ambulance, Syringe } from "lucide-react";

// Define service type
interface Service {
  title: string;
  description: string;
  icon: JSX.Element;
}

// Service Data with Lucide Icons
const services: Service[] = [
  {
    title: "Primary Care",
    description:
      "Physicians provide comprehensive medical evaluations and primary care for patients of all ages.",
    icon: <Stethoscope className='w-16 h-16 text-primary' />,
  },
  {
    title: "Sport Medicine",
    description:
      "Our team personalizes each athlete’s treatment based on his/her sport and age growing bodies.",
    icon: <HeartPulse className='w-16 h-16 text-primary' />,
  },
  {
    title: "Emergency Medicine",
    description:
      "Our clinic is always ready for urgent care such as Fractures, Infections, Bites, Minor Burns, Ear Aches, etc.",
    icon: <Ambulance className='w-16 h-16 text-primary' />,
  },
  {
    title: "Infectious Disease",
    description:
      "We have extra training in the diagnosis of illnesses and infections caused by bacteria, viruses and fungi.",
    icon: <Syringe className='w-16 h-16 text-primary' />,
  },
];
const OurServices = () => {
  return (
    <section>
      <Wrapper>
        <p className='text-center bg-accent w-44 rounded-bl-full rounded-tr-full text-white dark:text-black mb-2 py-1 mx-auto'>
          Services
        </p>
        <h1 className='text-center text-xl md:text-2xl lg:text-3xl font-bold pb-8'>
          Our Specialty
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {services.map((service) => (
            <Card
              key={service.title}
              className='border-none bg-background group relative overflow-hidden rounded-lg transition-all hover:shadow-lg hover:-translate-y-1 py-4'
            >
              <CardHeader className='flex justify-center items-center p-0'>
                <div className='bg-primary/10 p-3 group-hover:bg-primary/50 rounded-full'>
                  {service.icon}
                </div>
              </CardHeader>
              <CardContent className='text-base p-0 text-center'>
                <CardTitle className='text-xl py-2'>{service.title}</CardTitle>
                <p className='text-muted-foreground px-1'>
                  {service.description}
                </p>
              </CardContent>
              <div className='absolute bottom-0 left-0 h-1 w-0 bg-primary/50 transition-all duration-300 group-hover:w-full' />
            </Card>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default OurServices;
