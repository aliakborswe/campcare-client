import Wrapper from '@/components/common/Wrapper';
import { Check } from 'lucide-react';
import img1 from '@/assets/images/2.jpg'
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

const Comprehensive = () => {
    return (
      <section>
        <Wrapper>
          <div className='flex flex-col gap-8 justify-between items-center md:flex-row'>
            <div className='w-full md:w-1/3 h-[350px]'>
              <img
                src={img1}
                alt='image'
                className='rounded-md w-full h-full'
              />
            </div>
            <div className='w-full md:w-2/3 space-y-6 text-base'>
              <p className='text-center bg-accent w-44 rounded-br-full rounded-tl-full text-white dark:text-black mb-2 py-1 '>
                Our Supports
              </p>
              <h1 className='text-2xl lg:text-3xl font-bold'>
                Comprehensive Medical Care and Neurorehabilitation
              </h1>
              <p>
                We specialize in providing inpatient rehabilitation for patients
                who require round-the-clock hospital care. We use personalized
                treatments to get you back to living your life.
              </p>
              <ul className='[&_li]:flex [&_li]:gap-1 space-y-2'>
                <li>
                  {" "}
                  <Check className='text-primary ' /> Three hours of therapy,
                  five days per week;
                </li>
                <li>
                  {" "}
                  <Check className='text-primary ' /> 24/7 nursing care,
                  including nurses who specialize in rehabilitation;
                </li>
                <li>
                  {" "}
                  <Check className='text-primary ' /> Frequent visits from a
                  physician.
                </li>
              </ul>
              <Link to='/doctors'>
                <Button className='mt-8'>Meet Our Doctors</Button>
              </Link>
            </div>
          </div>
        </Wrapper>
      </section>
    );
};

export default Comprehensive;