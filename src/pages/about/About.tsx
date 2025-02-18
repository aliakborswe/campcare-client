import Wrapper from "@/components/common/Wrapper";
import { Compass, Heart, Globe } from "lucide-react";
import { Link } from "react-router";
import alexImg from "@/assets/images/alex.jpg";
import emilyImg from "@/assets/images/emily.jpg";
import ryanImg from "@/assets/images/ryan.jpg";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <section>
      <Helmet>
        <title>About | CampCare+</title>
      </Helmet>
      {/* Hero Section */}
      <div className='text-center text-white space-y-4 bg-contact-image bg-no-repeat bg-cover bg-black/50 bg-blend-overlay py-16'>
        <div className='container mx-auto px-2.5 space-y-4'>
          <h1 className='text-4xl font-bold'>About CampCare</h1>
          <p className=' text-lg'>
            At CampCare, we are committed to providing enriching and
            transformative experiences through our carefully curated camp
            programs. Our focus is on fostering growth, building connections,
            and creating memories that last a lifetime.
          </p>
        </div>
      </div>
      <Wrapper>
        {/* Mission, Vision, and Values */}
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Mission */}
          <div className='bg-primary/20 shadow-lg rounded-lg p-6 space-y-4'>
            <div className='flex items-center gap-4'>
              <Compass className='text-blue-500 w-10 h-10' />
              <h2 className='text-2xl font-bold'>Our Mission</h2>
            </div>
            <p>
              Our mission is to inspire individuals of all ages to embrace the
              outdoors, foster personal growth, and build a deeper connection
              with nature through immersive and inclusive camping experiences.
            </p>
          </div>

          {/* Vision */}
          <div className='bg-primary/20 shadow-lg rounded-lg p-6 space-y-4'>
            <div className='flex items-center gap-4'>
              <Globe className='text-green-500 w-10 h-10' />
              <h2 className='text-2xl font-bold'>Our Vision</h2>
            </div>
            <p>
              To be a globally recognized leader in outdoor education and
              adventure, creating a world where everyone has access to safe,
              meaningful, and life-changing camping opportunities.
            </p>
          </div>

          {/* Core Values */}
          <div className='col-span-full bg-primary/20 shadow-lg rounded-lg p-6 space-y-4'>
            <div className='flex items-center gap-4'>
              <Heart className='text-red-500 w-10 h-10' />
              <h2 className='text-2xl font-bold'>Our Core Values</h2>
            </div>
            <ul className='list-disc list-inside  space-y-2'>
              <li>
                <strong>Inclusivity:</strong> Welcoming everyone, regardless of
                background or ability.
              </li>
              <li>
                <strong>Safety:</strong> Prioritizing the well-being of all
                participants and staff.
              </li>
              <li>
                <strong>Sustainability:</strong> Promoting eco-friendly
                practices and environmental stewardship.
              </li>
              <li>
                <strong>Growth:</strong> Encouraging self-discovery, learning,
                and personal development.
              </li>
              <li>
                <strong>Connection:</strong> Building lasting relationships and
                a sense of community.
              </li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className='space-y-6 my-12 lg:my-16'>
          <h2 className='text-3xl font-bold text-center'>Meet Our Team</h2>
          <p className='text-center'>
            Our dedicated team of professionals and outdoor enthusiasts are here
            to ensure you have an unforgettable experience.
          </p>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {/* Example team members */}
            <div className='bg-white shadow-lg rounded-lg p-4 flex flex-col items-center'>
              <div className='w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center'>
                <img
                  src={alexImg}
                  className='rounded-full'
                  alt='Alex Johnson'
                />
              </div>
              <h3 className='mt-4 text-xl font-bold text-gray-800'>
                Alex Johnson
              </h3>
              <p className='text-gray-600 text-sm'>Founder & CEO</p>
            </div>
            <div className='bg-white shadow-lg rounded-lg p-4 flex flex-col items-center'>
              <div className='w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center'>
                <img
                  src={emilyImg}
                  className='rounded-full'
                  alt='Emily Carter'
                />
              </div>
              <h3 className='mt-4 text-xl font-bold text-gray-800'>
                Emily Carter
              </h3>
              <p className='text-gray-600 text-sm'>Camp Program Manager</p>
            </div>
            <div className='bg-white shadow-lg rounded-lg p-4 flex flex-col items-center'>
              <div className='w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center'>
                <img src={ryanImg} className='rounded-full' alt='Ryan Lee' />
              </div>
              <h3 className='mt-4 text-xl font-bold text-gray-800'>Ryan Lee</h3>
              <p className='text-gray-600 text-sm'>Adventure Specialist</p>
            </div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className='text-center bg-blue-50 p-6 rounded-lg space-y-4 shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Join Us on the Journey
          </h2>
          <p className='text-gray-600'>
            Ready to explore the great outdoors and create lasting memories?
            Join one of our exciting programs today!
          </p>
          <div>
            <Link
              to={"/"}
              className='bg-blue-600 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700'
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default About;
