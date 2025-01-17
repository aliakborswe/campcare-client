import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";
import logo from "@/assets/svg/logo.svg";
import SendEmail from "./SendEmail";


const Footer = () => {
  return (
    <footer className='bg-[#4e6181a0]'>
      <div className='container mx-auto px-4 pt-12'>
        <div className='flex flex-col md:flex-row justify-between gap-10 sm:gap-4'>
          <div className='w-full md:w-2/3'>
            <div className='flex flex-col items-center mb-8'>
              <div className='flex gap-2 items-center justify-start'>
                <img src={logo} alt='logo' className='w-12' />
                <p className={` font-bold text-xl hidden md:block`}>
                  CampCare+
                </p>
              </div>
              <p className=' mt-2 text-center '>
                Efficiently manage medical camps with our platform, connecting
                organizations, volunteers, and resources to deliver impactful
                healthcare services.
              </p>
            </div>
            {/* additional links */}
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
              <div>
                <h3 className='font-semibold text-lg mb-4'>Company</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      to='/'
                      className=' hover:text-primary transition-colors'
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/camps'
                      className=' hover:text-primary transition-colors'
                    >
                      Available Camps
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/about'
                      className=' hover:text-primary transition-colors'
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-4'>Legal</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      to='/'
                      className=' hover:text-primary transition-colors'
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/'
                      className=' hover:text-primary transition-colors'
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/'
                      className=' hover:text-primary transition-colors'
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-4'>Services</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      to='/'
                      className=' hover:text-primary transition-colors'
                    >
                      Camp Coordination & Scheduling
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/'
                      className=' hover:text-primary transition-colors'
                    >
                      Volunteer & Resource Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/'
                      className=' hover:text-primary transition-colors'
                    >
                      Patient Data & Reporting
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* contact info */}
          <div className='w-full md:w-1/3'>
            <h3 className='font-semibold text-lg mb-4'>Contact Us</h3>
            <SendEmail />
          </div>
        </div>

        {/* copyright */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 py-6 mt-8 border-t-2 border-primary text-primary'>
          <p>©CampCare+ 2024</p>
          <div className='flex gap-2'>
            <Link to='https://www.facebook.com/aliakbor28924'>
              <Facebook />
            </Link>
            <Link to='https://github.com/aliakbordev'>
              <Github />
            </Link>
            <Link to='https://www.linkedin.com/aliakbordev/'>
              <Linkedin />
            </Link>
            <Link to='https://x.com/aliakbordev'>
              <Twitter />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
